# webdriverio-a11y-demo
A simple WebdriverIO project with axe integration to perform accessibility testing


## Steps To Get Started

Step 1: Clone the repository `git@github.com:manoj9788/webdriverio-a11y-demo.git`

Step 2: Install node dependencies `npm install`

Step 3: Execute tests `npm test`

Step 4: _(optional: The base url of your application can be changes from the env file)_

Step 5: _(optional: Make necessary modification for Github Actions yml file)_

## Accessibility Rule

You could change audit rules as per your requirement like, WCAG or Section 508, add tags in the below function, which can be found in helper class,

```
let results = browser.executeAsync(function (done) {
        axe.run(
            {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag21aa', 'best-practice', 'section508']
                }
            }, (err, results) => {
                if (err) done(err)
                done(results)
            })
    })
```

| Tag Name      | Accessibility Standard / Purpose                      |
|---------------|-------------------------------------------------------|
| wcag2a        | WCAG 2.0 Level A                                      |
| wcag2aa       | WCAG 2.0 Level AA                                     |
| wcag21a       | WCAG 2.1 Level A                                      |
| wcag21aa      | WCAG 2.1 Level AA                                     |
| best-practice | Common accessibility best practices                   |
| wcag***       | WCAG success criterion e.g. wcag111 maps to SC 1.1.1  |
| ACT           | W3C approved Accessibility Conformance Testing rules  |
| section508    | Old Section 508 rules                                 |
| section508.*.*| Requirement in old Section 508                        |
| experimental  | Cutting-edge rules, disabled by default               |