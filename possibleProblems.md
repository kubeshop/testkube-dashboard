## react-error-overlay problem

If during development on browser appeared some weird iframe without any UI and with - it is this problem. More on github: https://github.com/facebook/create-react-app/issues/11773.

Check `package-lock.file` for `react-error-overlay` package. Its version should be `6.0.9`, not `6.0.11`. For some reason npm sees that version, specified in package.json, is `6.0.9`, but installs `6.0.11`. If the version is `6.0.11` just try to run `npm install react-error-overlay@6.0.9`, usually it helps. If it did not help - check the link to github issue above.