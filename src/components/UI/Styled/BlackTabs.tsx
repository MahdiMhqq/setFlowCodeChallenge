import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const TabsStyled = styled(Tabs)<TabsProps>(({ theme }) => ({
  borderRadius: 9999,
  overflow: "hidden",
  border: `1px solid ${theme.palette.primary.main}`,
  minHeight: "2rem",
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    borderRadius: 9999,
  },
}));

function BlackTabs(props: TabsProps) {
  return <TabsStyled {...props} />;
}

export default BlackTabs;

const TabStyled = styled(Tab)<TabProps>(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  minHeight: "2rem",
  padding: "0.5rem 2rem",
  zIndex: 1,
  "&.Mui-selected": {
    color: "#FFFFFF",
  },
  "&:not(.Mui-selected)": {
    color: theme.palette.primary.main,
  },
}));

function BlackTab(props: TabProps) {
  return <TabStyled {...props} />;
}

type BlackTabs = React.FunctionComponent & {
  Tab: React.FC;
};

BlackTabs.Tab = BlackTab;
