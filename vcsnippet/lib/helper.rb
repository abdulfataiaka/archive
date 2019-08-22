module Helper
  class SnippetError < StandardError; end

  def main_error message
    SnippetError.new(message)
  end

  def messages
    {
      filepath_invalid: "Unable to resolve filepath => $1",
      destination_invalid: "Destination should be a valid directory path => $1",
      source_invalid: "Source should be a valid directory path => $1",
      unsupported_fileext: "File extension \"$1\" not supported for file \"$2\""
    }
  end

  def script_comment_character
    {
      '.js' => '//',
      '.jsx' => '//',
      '.rb' => '#'
    }
  end

  def check_and_create dirpath
    begin
      unless File.directory?(dirpath)
        Dir.mkdir(dirpath)
      end
    rescue
      raise main_error("Could not create directory => #{dirpath}")
    end

    true
  end

  def dir_files dirpath
    Dir.entries(dirpath).select { |name| ![".", ".."].include?(name) }
  end

  def snippet_detail_prefix extension
    commenter = script_comment_character[extension]
    if commenter.nil? then nil else "#{commenter}snippet" end
  end

  def readlines filepath
    File.open(filepath).each { |line| yield(line) }
  end

  def write_to_file content, destination
    File.open(destination, 'w') do |file|
      file.write content
    end
  end
end
