import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";
import { FlipTextInput, FlipText, FlipSelectionButton, FlipContainer, FlipButton } from "components";

function HelpSetting() {
  const { colors } = useContext(ThemeContext);

  const [problemType, setProblemType] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const submitHelp = () => {
    // TODO: send help message
  };

  return (
    <FlipContainer style={styles.container}>
      <FlipText style={{ fontSize: normalize(18), color: colors.secondary, marginBottom: 15 }} type="Bold">
        Let us know what we can help you with:
      </FlipText>
      <FlipSelectionButton
        title="Technical Issues"
        primaryColor={colors.secondary}
        secondaryColor={colors.background}
        selected={problemType === "Technical Issues"}
        onPress={() => setProblemType("Technical Issues")}
      />
      <FlipSelectionButton
        title="Support Help"
        primaryColor={colors.secondary}
        secondaryColor={colors.background}
        selected={problemType === "Support Help"}
        onPress={() => setProblemType("Support Help")}
      />
      <FlipSelectionButton
        title="Ideas"
        primaryColor={colors.secondary}
        secondaryColor={colors.background}
        selected={problemType === "Ideas"}
        onPress={() => setProblemType("Ideas")}
      />
      <FlipText style={{ color: colors.secondary, marginTop: 30 }} type="Regular">
        Explain briefly about the situation
      </FlipText>
      <FlipTextInput
        style={styles.input}
        isForm
        placeholder="Type here..."
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={(value) => setDescription(value)}
      />
      <FlipButton buttonText="SUBMIT" type="Submit" disabled={!problemType || !description} onPress={submitHelp} />
    </FlipContainer>
  );
}

export default HelpSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
    height: 150,
  },
});
