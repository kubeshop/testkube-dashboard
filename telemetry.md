# Telemetry

## Data layer

| Name          | Description                                                                                              | Example                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `userID`      | User's fingerprint using [**FingerprintJS**](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs) | `6cdf3bbba90bebbcaa11e260a47d734e`                                                                                      |
| `browserName` | User agent                                                                                               | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36` |
| `appName`     | Application name                                                                                         | `testkube:ui/oss`, `testkube:ui/cloud` or `testkube:ui/enterprise`                                                      |
| `appVersion`  | Application version                                                                                      | `a7268ce`, `1.1.2-rc-ead479f` or `1.12.2`                                                                               |

## Events

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Description</th>
      <th colspan="2">Properties</th>
    </tr>
    <tr>
      <th colspan="2"></th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top">
      <td rowspan="1">
        <strong>initialized</strong><br>
        <code>tk.ui.initialized</code>
      </td>
      <td rowspan="1">
        Fired when the application is started
      </td>
      <td colspan="2" valign="middle" align="center"><i>None</i></td>
    </tr>
    <tr valign="top">
      <td rowspan="1">
        <strong>copyCommand</strong><br>
        <code>tk.ui.copyCommand</code>
      </td>
      <td rowspan="1">
        Fired when the user copy some command.
      </td>
      <td><code>eventModel.command</code></td>
      <td>Label of the copied command</td>
    </tr>
    <tr valign="top">
      <td rowspan="1">
        <strong>runTest</strong><br>
        <code>tk.ui.runTest</code>
      </td>
      <td rowspan="1">
        Fired when the test has been triggered to run by "Run" button.
      </td>
      <td><code>eventModel.type</code></td>
      <td>Executor type</td>
    </tr>
    <tr valign="top">
      <td rowspan="1">
        <strong>runTestSuite</strong><br>
        <code>tk.ui.runTestSuite</code>
      </td>
      <td rowspan="1">
        Fired when the test suite has been triggered to run by "Run" button.
      </td>
      <td colspan="2" valign="middle" align="center"><i>None</i></td>
    </tr>
    <tr valign="top">
      <td rowspan="1">
        <strong>createTest</strong><br>
        <code>tk.ui.createTest</code>
      </td>
      <td rowspan="1">
        Fired when the test has been created using modal.
      </td>
      <td><code>eventModel.type</code></td>
      <td>Executor type</td>
    </tr>
    <tr valign="top">
      <td rowspan="1">
        <strong>createTestSuite</strong><br>
        <code>tk.ui.createTestSuite</code>
      </td>
      <td rowspan="1">
        Fired when the test suite has been created using modal.
      </td>
      <td colspan="2" valign="middle" align="center"><i>None</i></td>
    </tr>
    <tr valign="top">
      <td rowspan="2">
        <strong>trackTime</strong><br>
        <code>tk.ui.trackTime</code>
      </td>
      <td rowspan="2">
        Fired when the user changes a page/tab and tracks time spent there.
      </td>
      <td><code>eventModel.page</code></td>
      <td>One of: <code>tests-details</code>, <code>tests-settings</code>, <code>tests-list</code>, <code>test-suites-details</code>, <code>test-suites-settings</code>, <code>test-suites-details</code></td>
    </tr>
    <tr valign="top">
      <td><code>eventModel.duration</code></td>
      <td>Time spent on the page (in ms)</td>
    </tr>
    <tr valign="top">
      <td>
        <strong>promoBannerCloseClick</strong><br>
        <code>tk.ui.promoBannerCloseClick</code>
      </td>
      <td>
        Fired when the user clicks "X" button in promo banner.
      </td>
      <td><code>eventModel.id</code></td>
      <td>The unique ID for the promo banner</td>
    </tr>
    <tr valign="top">
      <td>
        <strong>promoBannerPrimaryClick</strong><br>
        <code>tk.ui.promoBannerPrimaryClick</code>
      </td>
      <td>
        Fired when the user clicks the primary button in the promo banner.
      </td>
      <td><code>eventModel.id</code></td>
      <td>The unique ID for the promo banner</td>
    </tr>
    <tr valign="top">
      <td>
        <strong>promoBannerSecondaryClick</strong><br>
        <code>tk.ui.promoBannerSecondaryClick</code>
      </td>
      <td>
        Fired when the user clicks the secondary button in the promo banner.
      </td>
      <td><code>eventModel.id</code></td>
      <td>The unique ID for the promo banner</td>
    </tr>
  </tbody>
</table>
