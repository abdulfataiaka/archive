class Params
  def initialize params = {}
    @params = params
    verify_params
  end

  def method_missing meth, *args, &block
    get_value(meth)
  end

  def [] key = nil
    get_value(key)
  end

  private

  def get_value key
    if !key.nil? && @params.key?(key.to_s)
      @params[key.to_s]
    else
      nil
    end
  end

  def verify_params
    unless @params.is_a?(Hash)
      @params = {}
    else
      updates = {}
      # remove unnecessary padding spaces
      @params.each { |key, value| updates[key.strip] = value }
      @params = updates
    end
  end
end
