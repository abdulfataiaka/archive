require_relative "../../lang"

module DBSeed
  def execute_seeders
    seeder_files.each { |fn| execute_seeder(fn) }
  end

  def execute_seeder filename
    load_seeder_file(filename)
    Proc.new { seeder_load_action(filename) }.call
  end

  private

  class Error < StandardError
    def initialize message
      super message
    end
  end

  def seeder_load_action filename
    name = klass_name(filename)
    klass = Lang.constantize(name)

    unless is_seeder_class(klass)
      error = messages[:seeder_class_error]
      raise Error.new(error)
    end
    
    klass.new.seed
  end

  def load_seeder_file filename
    return false unless is_seeder_file(filename)

    main_seeder_path = seeders_path + "/seeder.rb"
    seeder_path = seeders_path + "/#{filename}"
    model_file_name = get_model_file_name(filename)
    model_path = rootdir + "/server/models/" + model_file_name

    begin
      Lang.import_script(main_seeder_path)
      Lang.import_script(seeder_path)
      Lang.import_script(model_path)
    rescue StandardError => error
      raise Error.new(error.message)
    end
  end

  def get_model_file_name seeder_filename
    split = seeder_filename.split('.')[0].split('_')
    split.pop
    split.join('_') + ".rb"
  end

  def is_seeder_file filename
    return false unless filename.is_a?(String)
    !filename.match(/^[A-Za-z_]+_seeder.rb$/).nil?
  end

  def seeder_files
    seeders_dir_content.select do |filename|
      is_seeder_file(filename)
    end
  end

  def is_seeder_class klass
    !klass.nil? &&
    klass&.superclass == Seeder
    klass.new.respond_to?(:seed)
  end

  def seeders_path
    rootdir + "/db/seeders"
  end

  def seeders_dir_content
    begin
      Dir.entries(seeders_path)
    rescue
      []
    end
  end

  def klass_name filename
    filename = filename.split('.')[0]
    filename.split('_').map(&:capitalize).join('').to_s
  end
end
