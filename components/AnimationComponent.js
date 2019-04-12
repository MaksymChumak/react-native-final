import React, { Component } from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import forest from '../assets/forest.png';
import leaf from '../assets/leaf.gif';

const SNOW_DIMENSIONS = { width: 20, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;

const FlippingImage = ({ back = false, delay, duration = 1000, source, style = {} }) => (
  <Animatable.Image
    animation={{
      from: { rotateY: back ? '0deg' : '180deg', rotate: !back ? '180deg' : '0deg' },
      to: { rotateY: back ? '360deg' : '-180deg', rotate: !back ? '180deg' : '0deg' },
    }}
    duration={duration}
    delay={delay}
    easing="linear"
    iterationCount="infinite"
    useNativeDriver
    source={source}
    style={{
      ...style,
      backfaceVisibility: 'hidden',
    }}
  />
);


const Falling = ({ duration, delay, style, children }) => (
  <Animatable.View
    animation={{
      from: { translateY: -SNOW_DIMENSIONS.height - WIGGLE_ROOM },
      to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM },
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount="infinite"
    useNativeDriver
    style={style}
  >
    {children}
  </Animatable.View>
);

const Swinging = ({ amplitude, rotation = 7, delay, duration = 700, children }) => (
	<Animatable.View
	  animation={{
		0: {
		  translateX: -amplitude,
		  translateY: -amplitude * 0.8,
		  rotate: `${rotation}deg`,
		},
		0.5: {
		  translateX: 0,
		  translateY: 0,
		  rotate: '0deg',
		},
		1: {
		  translateX: amplitude,
		  translateY: -amplitude * 0.8,
		  rotate: `${-rotation}deg`,
		},
	  }}
	  delay={delay}
	  duration={duration}
	  direction="alternate"
	  easing="ease-in-out"
	  iterationCount="infinite"
	  useNativeDriver
	>
	  {children}
	</Animatable.View>
);

const ForestBackground = ({ children }) => (
  <ImageBackground source={forest} style={{ flex: 1, width: "100%", height: '100%', top: 0, left: 0}} resizeMode={"cover"}>
    {children}
  </ImageBackground>
);

const randomize = max => Math.random() * max;

const range = count => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
};



const MakeLeafsFall = ({ count = 5, duration = 5000 }) => (
  <ForestBackground>
    {range(count)
      .map(i => randomize(1000))
      .map((flipDelay, i) => (
        <Falling
          key={i}
          duration={duration}
          delay={i * (duration / count)}
          style={{
            position: 'absolute',
            paddingHorizontal: WIGGLE_ROOM,
            left: randomize(SCREEN_DIMENSIONS.width - SNOW_DIMENSIONS.width) - WIGGLE_ROOM,
          }}
        >
			<Swinging amplitude={SNOW_DIMENSIONS.width / 5} delay={randomize(duration)}>
				<FlippingImage source={leaf} delay={flipDelay} />
				<FlippingImage
					source={leaf}
					delay={flipDelay}
					back
					style={{ position: 'absolute' }}
				/>
			</Swinging>
        </Falling>
	  ))}
  </ForestBackground>
);

export default class AnimationComponent extends Component {
    static navigationOptions = {
        title: 'Animation',
        headerStyle: {
            backgroundColor: '#586E58'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    }

    render() {
        return (
            <MakeLeafsFall />
        )
    }
}

