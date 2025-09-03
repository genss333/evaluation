import Flex from "../layout/flex";

const AppNavbar = () => {
  return (
    <Flex justify="between" align="center" gap={2} className="mr-10">
      <div>item1</div>
      <div>item2</div>
    </Flex>
  );
};

export default AppNavbar;
