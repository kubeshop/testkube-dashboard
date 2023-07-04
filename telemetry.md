# Telemetry

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
  </tbody>
</table>
