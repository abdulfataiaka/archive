require_relative "./support/app_helper"
require_relative "./lang"
require_relative "./db"

module App
  extend AppHelper

  def self.rootpath
    dirpath = File.dirname(__FILE__)
    File.expand_path("../", dirpath)
  end

  def self.realpath path
    "#{rootpath}/#{path}"
  end

  def self.public_path
    "#{rootpath}/public"
  end

  def self.index_path
    "#{public_path}/index.html"
  end

  def self.set_application_loadpaths
    Lang.set_load_paths([
      rootpath,
      realpath("server")
    ])
  end

  # The below loading methods are assummed
  # to always be successful to bootstrap
  # the application.

  def self.bootstrap_application
    import_dependencies
    import_application_modules
    set_application_loadpaths
    import_application
  end

  def self.import_application
    app_path = realpath("server/main")
    Lang.import_script(app_path)
  end

  def self.import_application_modules
    app_module_paths.map do |path|
      Lang.import_script(realpath(path))
    end
  end

  def self.import_dependencies
    app_dependency_names.map do |dependency|
      Lang.import_module(dependency)
    end
  end
end
