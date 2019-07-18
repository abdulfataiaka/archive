module LangHelper
  def import name_or_path, relative = true
    begin
      require_module(name_or_path, relative)
      yield(true)
    rescue LoadError => error
      yield(false)
    end
  end

  private

  def require_module name_or_path, relative
    unless relative
      require name_or_path
    else
      require_relative name_or_path
    end
  end
end
