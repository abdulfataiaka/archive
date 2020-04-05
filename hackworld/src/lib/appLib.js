import path from 'path';


class AppLib {
    static pathFromRoot(paths) {
        paths = path.join(...paths);
        return path.join(__dirname, '..', '..', paths);
    }

    static publicPath() {
        return AppLib.pathFromRoot(['public']);
    }

    static viewsPath() {
        return AppLib.pathFromRoot(['src', 'views']);
    }
}

export default AppLib;
