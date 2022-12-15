const templateHtml = (username, completionDate, coursetitle) =>
  `<table
width="600"
border="0"
cellspacing="0"
cellpadding="0"
class="email-body"
style="border: 2px solid #b78b40"
>
<tbody>
  <tr>
    <td width="80"></td>
    <td align="center">
      <table width="100%" border="0">
        <tbody>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align="center"><img src="heading.jpg" width="250" /></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align="center">
              <img src="heading-award.jpg" width="180" />
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td
              align="center"
              style="
                font-family: Arial, 'Helvetica Neue', Helvetica,
                  sans-serif;
                font-size: 40px;
                color: #b78b40;
                font-style: italic;
              "
            >
              <em>Name Goes Here</em>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td
              align="center"
              style="
                font-family: Arial, 'Helvetica Neue', Helvetica,
                  sans-serif;
                font-size: 14px;
                color: #000;
              "
            >
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td
              align="center"
              style="
                font-family: Arial, 'Helvetica Neue', Helvetica,
                  sans-serif;
                font-size: 14px;
                color: #000;
              "
            >
              Lorem Ipsum is simply dummy text of
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align="center">
              <table width="80%" border="0">
                <tbody>
                  <tr>
                    <td align="center">
                      <table width="100%" border="0">
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                style="
                                  background: #fff;
                                  border: 0;
                                  border-bottom: 2px solid #000;
                                "
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-family: Arial, 'Helvetica Neue',
                                  Helvetica, sans-serif;
                                font-size: 18px;
                                color: #000;
                              "
                            >
                              <strong>Name</strong>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-family: Arial, 'Helvetica Neue',
                                  Helvetica, sans-serif;
                                font-size: 14px;
                                color: #000;
                              "
                            >
                              Name : ${username}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="40">&nbsp;</td>
                    <td>
                      <table width="100%" border="0">
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                style="
                                  background: #fff;
                                  border: 0;
                                  border-bottom: 2px solid #000;
                                "
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-family: Arial, 'Helvetica Neue',
                                  Helvetica, sans-serif;
                                font-size: 18px;
                                color: #000;
                              "
                            >
                              <strong>Course Name</strong>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-family: Arial, 'Helvetica Neue',
                                  Helvetica, sans-serif;
                                font-size: 14px;
                                color: #000;
                              "
                            >
                              ${coursetitle}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </td>
    <td width="80"></td>
  </tr>
</tbody>
</table>`;
export default templateHtml;
