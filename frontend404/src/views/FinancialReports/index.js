import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FinancialStatisticsSection from "./components/financialStatisticsSection";
import FinancialEventsSection from './components/financialEventsSection';
import Container from "@mui/material/Container";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const FinancialReports = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 3,
          height: "90vh",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="financial reports tab"
            centered
          >
            <Tab label="Financial Events" {...a11yProps(0)} />
            <Tab label="Statistics" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel
          value={selectedTab}
          index={0}
          style={{
            height: "80vh"
          }}
        >
          <FinancialEventsSection />
        </TabPanel>
        <TabPanel
          value={selectedTab}
          index={1}
          style={{
            height: "80vh"
          }}
        >
          <FinancialStatisticsSection />
        </TabPanel>
      </Container>
    </Box>
  );
};
export default FinancialReports;