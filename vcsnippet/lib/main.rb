require_relative '../lib/binary'
require_relative '../lib/snippet'

if Binary.argument_invalid
  puts Binary.usage
  exit
end

begin
  paramters = Binary.paramters
  filepath = paramters[:filepath]
  source = paramters[:source]
  destination = paramters[:destination]

  puts Binary.usage if filepath.nil? && source.nil?
  Snippet.export_snippet(filepath, destination) unless filepath.nil?
  Snippet.export_snippets(source, destination) unless source.nil?

rescue StandardError => error
  puts "\n[!] #{error.message}\n\n"
end
