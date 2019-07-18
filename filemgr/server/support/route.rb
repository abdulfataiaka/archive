module Route
  def verbs
    %w(
      get post 
      put patch
      delete link unlink
      options
    )
  end

  def matchall prefix = nil, &block
    path = if prefix.nil? then "*" else "#{prefix}/*" end
      
    verbs.each do |meth|
      send(meth.to_sym, path, &block)
    end
  end

  def define verb, path, &block
    [ path, "#{path}/" ].each do |_path|
      send(verb, _path, &block)
    end
  end

  def all path, &block
    verbs.each do |verb|
      define(verb, path, &block)
    end
  end
end
