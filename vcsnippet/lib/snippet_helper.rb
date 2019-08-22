require_relative './helper'
require_relative './layout'

module SnippetHelper
  include Helper
  include Layout

  def validate_export_snippets source, destination
    raise main_error(messages[:source_invalid].sub("$1", source)) unless File.directory?(source)
    raise main_error(messages[:destination_invalid].sub("$1", destination)) unless check_and_create(destination)
    source = File.realpath(source)
    destination = File.realpath(destination)
    filestats = dir_files(source).map { |filename| FileStat.new("#{source}/#{filename}", destination) }
    invalids = filestats.select { |filestat| !filestat.error.nil? }
    raise invalids.first.error unless invalids.empty?
    filestats
  end

  def extract_filestat_snippets filestat
    result = snippets(filestat.filepath, filestat.fileext)
    payload = result.is_a?(Array) ? [ nil, result ] : [ result, [] ]
    { error: payload[0], snippets: payload[1] }
  end

  def export_filestat_snippets filestat
    result = extract_filestat_snippets(filestat)
    return result[:error] unless result[:error].nil?
    snippets = format_snippets(result[:snippets])
    json = snippets_json_generate(snippets)
    generate_export_file(json, filestat)
  end

  def format_snippets snippets
    snippets.each_with_index.map do |snippet, index|
      snippet[:last] = index >= snippets.size - 1
      format_snippet(snippet)
    end
  end

  def snippets_json_generate snippets
    json = "{#{newline}"
    snippets.each { |snippet| json += snippet }
    json += "#{newline}}#{newline}"
    json
  end

  def generate_export_file content, filestats
    output_path = "#{filestats.destination}/#{filestats.filename}#{filestats.fileext}.json"
    write_to_file(content, output_path)
  end
  
  # to extract snippet details
  def parse_snippet_details line, prefix
    details = line[prefix.length, line.length - prefix.length]
    details_split = details.split('::').map(&:strip)
    return nil unless (1..2).cover? details_split.size
    
    {
      prefix: details_split[0],
      description: details_split[1]
    }
  end

  # return array of snippets with full details
  def snippets filepath, fileext
    prefix = snippet_detail_prefix(fileext)

    snippet = nil; result = []
    readlines(filepath) do |line|
      unless line.strip.start_with?(prefix)
        snippet[:body] << line unless snippet.nil?
        next
      end

      result << snippet unless snippet.nil?
      snippet = parse_snippet_details(line, prefix)
      snippet[:body] = [] unless snippet.nil?
    end

    result << snippet unless snippet.nil?
    result
  end
end
