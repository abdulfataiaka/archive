module Binary
  def self.usage
    "\n[*] usage for vcsnippet\n[$] vcsnippet [ -s source | -f filepath ] -d destination\n\n"
  end

  def self.argument_invalid
    arguments = ARGV.join(" ").strip
    (
      arguments.match(/^((-s)|(-f)) [^ ]+ -d [^ ]+$/).nil? &&
      arguments.match(/^-d [^ ]+ ((-s)|(-f)) [^ ]+$/).nil?
    )
  end
  
  def self.paramters
    result = {} ; option = nil
    options = { "-s" => :source, "-d" => :destination, "-f" => :filepath }
  
    ARGV.each do |argument|
      (option = argument; next) if options.keys.include?(argument)
      option_symbol = options[option]
      result[option_symbol] = argument
    end

    result
  end
end
