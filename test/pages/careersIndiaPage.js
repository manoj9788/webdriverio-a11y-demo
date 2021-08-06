import BasePage from './base'

class CareersPage extends BasePage{
    
    open(){
        super.open('/careers/india')
    }
    
}

export default new CareersPage()