class Web < Controller
  def index
    File.read(App.index_path)
  end
end
