require_relative './filestat'
require_relative './snippet_helper'

class Snippet
  extend SnippetHelper

  def self.export_snippet filepath, destination
    filestat = FileStat.new(filepath, destination)
    raise filestat.error unless filestat.error.nil?
    export_filestat_snippets(filestat)
  end

  def self.export_snippets source, destination
    filestats = validate_export_snippets(source, destination)
    filestats.each { |filestat| export_filestat_snippets(filestat) }
    puts "\n[*] Snippets generated successfully"
    puts "[*] Output path is #{destination}\n\n"
  end
end
