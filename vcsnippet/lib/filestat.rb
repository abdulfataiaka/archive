require_relative './helper'

class FileStat
  include Helper
  attr_reader :filepath, :destination, :fileext, :filename, :error

  def initialize (filepath, destination)
    @basename = File.basename(filepath)
    @filepath = File.realpath(filepath)
    @fileext = File.extname(@basename)
    @filename = File.basename(@basename, @fileext)
    @destination = File.realpath(destination)
    @error = if validate == true then nil else main_error(validate) end
  end

  private

  def validate
    return messages[:filepath_invalid].sub("$1", @filepath) unless File.file?(@filepath)
    prefix = snippet_detail_prefix(@fileext)
    return messages[:unsupported_fileext].sub("$1", @fileext).sub("$2", @basename) if prefix.nil?
    File.directory?(@destination) || messages[:destination_invalid].sub("$1", @destination)
  end
end
