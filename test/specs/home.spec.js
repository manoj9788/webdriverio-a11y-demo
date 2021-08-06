import ally from '../helper/a11y'
import HomePage from '../pages/homePage'


describe("Home Page Accessibilty Test", () => {

    before(() => {
        HomePage.open()
    })

    it("has no violations", () => {
        let results = ally.runAccessibilityAudit("HomePage.csv")
        expect(results.violations.length, "Home page has accessibilty issues").to.equal(0)
    })
})