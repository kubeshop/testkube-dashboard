import {QuestionCircleOutlined} from '@ant-design/icons';
import {Popover} from 'antd';

import {createPlugin, external} from '@testkube/plugins';

import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';

import Text from '@custom-antd/Typography/Text';

import {DropdownListItem} from '@organisms/Sider/Sider.styled';

import type GeneralPlugin from '@plugins/general/plugin';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('web-general-oss-only')
  .needs(generalStub.slots('siderOtherItems', 'siderLogo'))
  .needs(generalStub.data('useDashboardNavigate'))

  // Finish
  .init(tk => {
    tk.slots.siderLogo.add(<Logo />);

    // TODO: Separate in specific plugins?
    tk.slots.siderOtherItems.add({
      icon: 'documentation',
      dropdownComponent: (
        <Popover
          align={{offset: [0, 13]}}
          placement="rightBottom"
          content={
            <>
              <DropdownListItem>
                <a href={externalLinks.documentation} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Documentation
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={externalLinks.discord} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Discord community
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={externalLinks.github} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    GitHub
                  </Text>
                </a>
              </DropdownListItem>
            </>
          }
          trigger={['hover']}
        >
          <QuestionCircleOutlined style={{fontSize: 20}} />
        </Popover>
      ),
    });
    tk.slots.siderOtherItems.add({
      icon: 'cloudMigrate',
      title: 'Connect to Testkube Cloud',
      size: 32,
      onClick: () => window.open(externalLinks.OSStoCloudMigration),
    });
  });
