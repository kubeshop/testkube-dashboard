import PageBlueprint from '@organisms/PageBlueprint';

import YourInstallation from '@pages/GlobalSettings/General/YourInstallation';

const About: React.FC = () => {
  return (
    <PageBlueprint
      title="About your installation"
      description={<>An overview about all the relevant information for your Testkube on premise installation</>}
    >
      <YourInstallation />
    </PageBlueprint>
  );
};

export default About;
