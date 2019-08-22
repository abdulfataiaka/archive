module Layout
  def format_snippet snippet
    lines = format_snippet_lines(snippet)
    lines.inject("") { |aggr, line| "#{aggr}#{line}" }
  end

  private

  def format_snippet_lines snippet
    last = snippet[:last] || false
    prefix = snippet[:prefix]
    description = snippet[:description]
    body = snippet[:body]
    lines = start_lines(prefix, description)
    lines += body_lines(body)
    lines += [ "#{tab}}#{last ? "" : ",#{newline(2)}"}" ]
  end

  def tab count = 1
    (1..count).inject("") { |aggr| "#{aggr}\t"}
  end

  def newline count = 1
    (1..count).inject("") { |aggr| "#{aggr}\n"}
  end

  def quote; "\""; end

  def start_lines prefix, description
    [
      "#{tab}#{quote}snippet #{prefix}#{quote}: {#{newline}",
      "#{tab(2)}#{quote}prefix#{quote}: #{quote}#{prefix}#{quote},#{newline}",
      "#{tab(2)}#{quote}description#{quote}: #{quote}#{description}#{quote},#{newline}"
    ]
  end

  def body_lines body
    initspace = tab(2)
    result = [ "#{initspace}#{quote}body#{quote}: " ]

    if body.size == 1
      result[0] += "#{body[0].rstrip.inspect}#{newline}"
      return result
    end

    result[0] += " [#{newline}"
    body.each_with_index do |line, index|
      last = index >= body.size - 1
      bodyline = "#{initspace}#{tab}#{line.rstrip.inspect}#{ last ? "" : ","}#{newline}"
      result << bodyline
    end

    result << "#{initspace}]#{newline}"
    result
  end
end
