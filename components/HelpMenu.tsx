import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Menu } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

interface HelpMenuProps {
  firstAction: () => void;
  secondAction: () => void;
}

export default function HelpMenu({ firstAction, secondAction }: HelpMenuProps) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{}}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        style={{ marginTop: 80 }}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Ionicons size={28} name="bulb" color={"#8BAB52"} />
          </TouchableOpacity>
        }
      >
        <Menu.Item
          leadingIcon="comment-question"
          onPress={() => {
            firstAction();
            closeMenu();
          }}
          title="Mostrar palabra"
        />
        <Menu.Item
          leadingIcon={"restore"}
          onPress={() => {
            secondAction();
            closeMenu();
          }}
          title="Reiniciar el juego"
        />
      </Menu>
    </View>
  );
}
