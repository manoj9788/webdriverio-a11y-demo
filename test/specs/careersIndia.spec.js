import ally from '../helper/a11y'
import CareersPage from '../pages/careersIndiaPage'

describe("Accesibility Test for Careers Page", () => {

    before(() => {
        CareersPage.open()
    })

    it('has no violations', () => {
        let results = ally.runAccessibilityAudit("CareersPage.csv")
        expect(results.violations.length, "Careers India page has accessibilty issues").to.equal(0)
    })
})