import Flex from "../layout/flex";
import { SidebarTrigger } from "../ui/sidebar";

const AppNavbar = () => {
  return (
    <div className="w-full">
      <Flex justify="between" align="center">
        <SidebarTrigger />
        <Flex>
          <div>item1</div>
          <div>item2</div>
        </Flex>
      </Flex>
    </div>
  );
};

export default AppNavbar;
