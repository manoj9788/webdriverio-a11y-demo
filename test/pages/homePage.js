import Basepage from './base'

class HomePage extends Basepage {

    open() {
        super.open('./')
    }
}

export default new HomePage()