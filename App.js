import React from 'react';
import {
  StyleSheet,
  Animated,
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import content from './content';
import Icon from './Icon';

class CollapsibleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false,
      rotation: new Animated.Value(0)
    }
  }

  handlePress = () => {
    const { isExpanded } = this.state;

    Animated.timing(
      this.state.rotation,
      {
        toValue: isExpanded ? 0 : 1,
        duration: 500,
      }
    ).start();

    this.setState({ isExpanded: !isExpanded });
  }

  render() {
    const { question } = this.props;
    const { isExpanded, rotation } = this.state;

    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.handlePress}
          style={[styles.titleWrapper]}
        >
          <Text style={styles.title}>{question.title}</Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon
              kind={"chevron_down"}
              color="white"
              size={25}
            />
          </Animated.View>
        </TouchableOpacity>

        {isExpanded && <Text>{question.text}</Text>}
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.wrapper}>
        {content.map(question => <CollapsibleItem key={question.title} question={question} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
  },
  titleWrapper: {
    backgroundColor: '#008B7D',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
