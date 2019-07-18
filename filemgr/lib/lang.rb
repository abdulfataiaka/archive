require_relative "./support/lang_helper"

module Lang
  extend LangHelper

  def self.constantize name
    begin
      Object.const_get(name)
    rescue StandardError => error
      nil
    end
  end

  def self.import_module name
    import(name, false) do |status|
      yield(status) if block_given?
    end
  end

  def self.import_script path
    import(path, true) do |status|
      yield(status) if block_given?
    end
  end

  def self.set_load_paths paths
    paths.each do |path|
      $:.unshift path
    end
  end
end
