import * as React from 'react';
import "./MyEmojis.css";

export class MyEmojis extends React.Component {

  constructor(props) {
    super(props);
    this.emojiList = {
      smileys: {
        title: 'Smileys',
        datas: [
          "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "☺️",
          "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛",
          "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧",
          "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮",
          "🤧", "😇", "🤠", "🤡", "🥳", "🥴", "🥺", "🤥", "🤫", "🤭", "🧐", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽",
          "🤖", "💩", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
        ]
      },
      peopleAndFantasy: {
        title: 'People and Fantasy',
        datas: [
          "👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👵", "🧓", "👴", "👲", "👳‍♀️", "👳‍♂️", "🧕", "🧔",
          "👱‍♂️", "👱‍♀️", "👨‍🦰", "👩‍🦰", "👨‍🦱", "👩‍🦱", "👨‍🦲", "👩‍🦲", "👨‍🦳", "👩‍🦳", "🦸‍♀️", "🦸‍♂️", "🦹‍♀️",
          "🦹‍♂️", "👮‍♀️", "👮‍♂️", "👷‍♀️", "👷‍♂️", "💂‍♀️", "💂‍♂️", "🕵️‍♀️", "🕵️‍♂️", "👩‍⚕️", "👨‍⚕️",
          "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎓", "👨‍🎓", "👩‍🎤", "👨‍🎤", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼",
          "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚒", "👨‍🚒", "👩‍✈️", "👨‍✈️", "👩‍🚀", "👨‍🚀", "👩‍⚖️",
          "👨‍⚖️", "👰", "🤵", "👸", "🤴", "🤶", "🎅", "🧙‍♀️", "🧙‍♂️", "🧝‍♀️", "🧝‍♂️", "🧛‍♀️", "🧛‍♂️", "🧟‍♀️",
          "🧟‍♂️", "🧞‍♀️", "🧞‍♂️", "🧜‍♀️", "🧜‍♂️", "🧚‍♀️", "🧚‍♂️", "👼", "🤰", "🤱", "🙇‍♀️", "🙇‍♂️", "💁‍♀️",
          "💁‍♂️", "🙅‍♀️", "🙅‍♂️", "🙆‍♀️", "🙆‍♂️", "🙋‍♀️", "🙋‍♂️", "🤦‍♀️", "🤦‍♂️", "🤷‍♀️", "🤷‍♂️", "🙎‍♀️",
          "🙎‍♂️", "🙍‍♀️", "🙍‍♂️", "💇‍♀️", "💇‍♂️", "💆‍♀️", "💆‍♂️", "🧖‍♀️", "🧖‍♂️", "💅", "🤳", "💃", "🕺",
          "👯‍♀️", "👯‍♂️", "🕴", "🚶‍♀️", "🚶‍♂️", "🏃‍♀️", "🏃‍♂️", "👫", "👭", "👬", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏",
          "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦",
          "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👦‍👦", "👩‍👧‍👧", "👨‍👦", "👨‍👧",
          "👨‍👧‍👦", "👨‍👦‍👦", "👨‍👧‍👧", "🤲", "👐", "🙌", "👏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤟", "🤘", "👌",
          "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🦵", "🦶", "🖕", "✍️", "🙏", "💍", "💄", "💋",
          "👄", "👅", "👂", "👃", "👣", "👁", "👀", "🧠", "🦴", "🦷", "🗣", "👤", "👥"
        ]
      },
      clothingAndAccessories: {
        title: 'Clothing and Accessories',
        datas: [
          "🧥", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "👠", "👡", "👢", "👞", "👟", "🥾", "🥿", "🧦", "🧤", "🧣", "🎩", "🧢",
          "👒", "🎓", "⛑", "👑", "👝", "👛", "👜", "💼", "🎒", "👓", "🕶", "🥽", "🥼", "🌂", "🧵", "🧶"
        ]
      },
      paleEmojis: {
        title: 'Pale Emojis',
        datas: [
          "👶🏻", "👦🏻", "👧🏻", "👨🏻", "👩🏻", "👱🏻‍♀️", "👱🏻", "👴🏻", "👵🏻", "👲🏻", "👳🏻‍♀️", "👳🏻", "👮🏻‍♀️", "👮🏻", "👷🏻‍♀️", "👷🏻",
          "💂🏻‍♀️", "💂🏻", "🕵🏻‍♀️", "🕵🏻", "👩🏻‍⚕️", "👨🏻‍⚕️", "👩🏻‍🌾", "👨🏻‍🌾", "👩🏻‍🍳", "👨🏻‍🍳", "👩🏻‍🎓", "👨🏻‍🎓", "👩🏻‍🎤", "👨🏻‍🎤",
          "👩🏻‍🏫", "👨🏻‍🏫", "👩🏻‍🏭", "👨🏻‍🏭", "👩🏻‍💻", "👨🏻‍💻", "👩🏻‍💼", "👨🏻‍💼", "👩🏻‍🔧", "👨🏻‍🔧", "👩🏻‍🔬", "👨🏻‍🔬", "👩🏻‍🎨", "👨🏻‍🎨", "👩🏻‍🚒", "👨🏻‍🚒",
          "👩🏻‍✈️", "👨🏻‍✈️", "👩🏻‍🚀", "👨🏻‍🚀", "👩🏻‍⚖️", "👨🏻‍⚖️", "🤶🏻", "🎅🏻", "👸🏻", "🤴🏻", "👰🏻", "🤵🏻", "👼🏻", "🤰🏻", "🙇🏻‍♀️",
          "🙇🏻", "💁🏻", "💁🏻‍♂️", "🙅🏻", "🙅🏻‍♂️", "🙆🏻", "🙆🏻‍♂️", "🙋🏻", "🙋🏻‍♂️", "🤦🏻‍♀️", "🤦🏻‍♂️", "🤷🏻‍♀️", "🤷🏻‍♂️", "🙎🏻",
          "🙎🏻‍♂️", "🙍🏻", "🙍🏻‍♂️", "💇🏻", "💇🏻‍♂️", "💆🏻", "💆🏻‍♂️", "🕴🏻", "💃🏻", "🕺🏻", "🚶🏻‍♀️", "🚶🏻", "🏃🏻‍♀️", "🏃🏻",
          "🤲🏻", "👐🏻", "🙌🏻", "👏🏻", "🙏🏻", "👍🏻", "👎🏻", "👊🏻", "✊🏻", "🤛🏻", "🤜🏻", "🤞🏻", "✌🏻", "🤟🏻", "🤘🏻", "👌🏻", "👈🏻", "👉🏻", "👆🏻", "👇🏻",
          "☝🏻", "✋🏻", "🤚🏻", "🖐🏻", "🖖🏻", "👋🏻", "🤙🏻", "💪🏻", "🖕🏻", "✍🏻", "🤳🏻", "💅🏻", "👂🏻", "👃🏻"
        ]
      },
      creamWhiteEmojis: {
        title: 'Cream White Emojis',
        datas: [
          "👶🏼", "👦🏼", "👧🏼", "👨🏼", "👩🏼", "👱🏼‍♀️", "👱🏼", "👴🏼", "👵🏼", "👲🏼", "👳🏼‍♀️", "👳🏼", "👮🏼‍♀️", "👮🏼", "👷🏼‍♀️",
          "👷🏼", "💂🏼‍♀️", "💂🏼", "🕵🏼‍♀️", "🕵🏼", "👩🏼‍⚕️", "👨🏼‍⚕️", "👩🏼‍🌾", "👨🏼‍🌾", "👩🏼‍🍳", "👨🏼‍🍳", "👩🏼‍🎓", "👨🏼‍🎓", "👩🏼‍🎤",
          "👨🏼‍🎤", "👩🏼‍🏫", "👨🏼‍🏫", "👩🏼‍🏭", "👨🏼‍🏭", "👩🏼‍💻", "👨🏼‍💻", "👩🏼‍💼", "👨🏼‍💼", "👩🏼‍🔧", "👨🏼‍🔧", "👩🏼‍🔬", "👨🏼‍🔬", "👩🏼‍🎨", "👨🏼‍🎨",
          "👩🏼‍🚒", "👨🏼‍🚒", "👩🏼‍✈️", "👨🏼‍✈️", "👩🏼‍🚀", "👨🏼‍🚀", "👩🏼‍⚖️", "👨🏼‍⚖️", "🤶🏼", "🎅🏼", "👸🏼", "🤴🏼", "👰🏼", "🤵🏼", "👼🏼",
          "🤰🏼", "🙇🏼‍♀️", "🙇🏼", "💁🏼", "💁🏼‍♂️", "🙅🏼", "🙅🏼‍♂️", "🙆🏼", "🙆🏼‍♂️", "🙋🏼", "🙋🏼‍♂️", "🤦🏼‍♀️", "🤦🏼‍♂️", "🤷🏼‍♀️",
          "🤷🏼‍♂️", "🙎🏼", "🙎🏼‍♂️", "🙍🏼", "🙍🏼‍♂️", "💇🏼", "💇🏼‍♂️", "💆🏼", "💆🏼‍♂️", "🕴🏼", "💃🏼", "🕺🏼", "🚶🏼‍♀️", "🚶🏼", "🏃🏼‍♀️",
          "🏃🏼", "🤲🏼", "👐🏼", "🙌🏼", "👏🏼", "🙏🏼", "👍🏼", "👎🏼", "👊🏼", "✊🏼", "🤛🏼", "🤜🏼", "🤞🏼", "✌🏼", "🤟🏼", "🤘🏼", "👌🏼", "👈🏼", "👉🏼", "👆🏼", "👇🏼",
          "☝🏼", "✋🏼", "🤚🏼", "🖐🏼", "🖖🏼", "👋🏼", "🤙🏼", "💪🏼", "🖕🏼", "✍🏼", "🤳🏼", "💅🏼", "👂🏼", "👃🏼"
        ]
      },
      moderateBrownEmojis: {
        title: 'Moderate Brown Emojis',
        datas: [
          "👶🏽", "👦🏽", "👧🏽", "👨🏽", "👩🏽", "👱🏽‍♀️", "👱🏽", "👴🏽", "👵🏽", "👲🏽", "👳🏽‍♀️", "👳🏽", "👮🏽‍♀️", "👮🏽",
          "👷🏽‍♀️", "👷🏽", "💂🏽‍♀️", "💂🏽", "🕵🏽‍♀️", "🕵🏽", "👩🏽‍⚕️", "👨🏽‍⚕️", "👩🏽‍🌾", "👨🏽‍🌾", "👩🏽‍🍳", "👨🏽‍🍳", "👩🏽‍🎓",
          "👨🏽‍🎓", "👩🏽‍🎤", "👨🏽‍🎤", "👩🏽‍🏫", "👨🏽‍🏫", "👩🏽‍🏭", "👨🏽‍🏭", "👩🏽‍💻", "👨🏽‍💻", "👩🏽‍💼", "👨🏽‍💼", "👩🏽‍🔧", "👨🏽‍🔧", "👩🏽‍🔬", "👨🏽‍🔬",
          "👩🏽‍🎨", "👨🏽‍🎨", "👩🏽‍🚒", "👨🏽‍🚒", "👩🏽‍✈️", "👨🏽‍✈️", "👩🏽‍🚀", "👨🏽‍🚀", "👩🏽‍⚖️", "👨🏽‍⚖️", "🤶🏽", "🎅🏽", "👸🏽", "🤴🏽",
          "👰🏽", "🤵🏽", "👼🏽", "🤰🏽", "🙇🏽‍♀️", "🙇🏽", "💁🏽", "💁🏽‍♂️", "🙅🏽", "🙅🏽‍♂️", "🙆🏽", "🙆🏽‍♂️", "🙋🏽", "🙋🏽‍♂️", "🤦🏽‍♀️",
          "🤦🏽‍♂️", "🤷🏽‍♀️", "🤷🏽‍♂️", "🙎🏽", "🙎🏽‍♂️", "🙍🏽", "🙍🏽‍♂️", "💇🏽", "💇🏽‍♂️", "💆🏽", "💆🏽‍♂️", "🕴🏼", "💃🏽", "🕺🏽",
          "🚶🏽‍♀️", "🚶🏽", "🏃🏽‍♀️", "🏃🏽", "🤲🏽", "👐🏽", "🙌🏽", "👏🏽", "🙏🏽", "👍🏽", "👎🏽", "👊🏽", "✊🏽", "🤛🏽", "🤜🏽", "🤞🏽", "✌🏽",
          "🤟🏽", "🤘🏽", "👌🏽", "👈🏽", "👉🏽", "👆🏽", "👇🏽", "☝🏽", "✋🏽", "🤚🏽", "🖐🏽", "🖖🏽", "👋🏽", "🤙🏽", "💪🏽", "🖕🏽", "✍🏽", "🤳🏽", "💅🏽",
          "👂🏽", "👃🏽"
        ]
      },
      darkBrownEmojis: {
        title: 'Dark Brown Emojis',
        datas: [
          "👶🏾", "👦🏾", "👧🏾", "👨🏾", "👩🏾", "👱🏾‍♀️", "👱🏾", "👴🏾", "👵🏾", "👲🏾", "👳🏾‍♀️", "👳🏾", "👮🏾‍♀️", "👮🏾", "👷🏾‍♀️",
          "👷🏾", "💂🏾‍♀️", "💂🏾", "🕵🏾‍♀️", "🕵🏾", "👩🏾‍⚕️", "👨🏾‍⚕️", "👩🏾‍🌾", "👨🏾‍🌾", "👩🏾‍🍳", "👨🏾‍🍳", "👩🏾‍🎓", "👨🏾‍🎓", "👩🏾‍🎤",
          "👨🏾‍🎤", "👩🏾‍🏫", "👨🏾‍🏫", "👩🏾‍🏭", "👨🏾‍🏭", "👩🏾‍💻", "👨🏾‍💻", "👩🏾‍💼", "👨🏾‍💼", "👩🏾‍🔧", "👨🏾‍🔧", "👩🏾‍🔬", "👨🏾‍🔬", "👩🏾‍🎨", "👨🏾‍🎨", "👩🏾‍🚒",
          "👨🏾‍🚒", "👩🏾‍✈️", "👨🏾‍✈️", "👩🏾‍🚀", "👨🏾‍🚀", "👩🏾‍⚖️", "👨🏾‍⚖️", "🤶🏾", "🎅🏾", "👸🏾", "🤴🏾", "👰🏾", "🤵🏾", "👼🏾", "🤰🏾",
          "🙇🏾‍♀️", "🙇🏾", "💁🏾", "💁🏾‍♂️", "🙅🏾", "🙅🏾‍♂️", "🙆🏾", "🙆🏾‍♂️", "🙋🏾", "🙋🏾‍♂️", "🤦🏾‍♀️", "🤦🏾‍♂️", "🤷🏾‍♀️", "🤷🏾‍♂️",
          "🙎🏾", "🙎🏾‍♂️", "🙍🏾", "🙍🏾‍♂️", "💇🏾", "💇🏾‍♂️", "💆🏾", "💆🏾‍♂️", "🕴🏾", "💃🏾", "🕺🏾", "🚶🏾‍♀️", "🚶🏾", "🏃🏾‍♀️",
          "🏃🏾", "🤲🏾", "👐🏾", "🙌🏾", "👏🏾", "🙏🏾", "👍🏾", "👎🏾", "👊🏾", "✊🏾", "🤛🏾", "🤜🏾", "🤞🏾", "✌🏾", "🤟🏾", "🤘🏾", "👌🏾", "👈🏾", "👉🏾", "👆🏾",
          "👇🏾", "☝🏾", "✋🏾", "🤚🏾", "🖐🏾", "🖖🏾", "👋🏾", "🤙🏾", "💪🏾", "🖕🏾", "✍🏾", "🤳🏾", "💅🏾", "👂🏾", "👃🏾"
        ]
      },
      blackEmojis: {
        title: 'Black Emojis',
        datas: [
          "👶🏿", "👦🏿", "👧🏿", "👨🏿", "👩🏿", "👱🏿‍♀️", "👱🏿", "👴🏿", "👵🏿", "👲🏿", "👳🏿‍♀️", "👳🏿", "👮🏿‍♀️", "👮🏿", "👷🏿‍♀️", "👷🏿",
          "💂🏿‍♀️", "💂🏿", "🕵🏿‍♀️", "🕵🏿", "👩🏿‍⚕️", "👨🏿‍⚕️", "👩🏿‍🌾", "👨🏿‍🌾", "👩🏿‍🍳", "👨🏿‍🍳", "👩🏿‍🎓", "👨🏿‍🎓", "👩🏿‍🎤", "👨🏿‍🎤",
          "👩🏿‍🏫", "👨🏿‍🏫", "👩🏿‍🏭", "👨🏿‍🏭", "👩🏿‍💻", "👨🏿‍💻", "👩🏿‍💼", "👨🏿‍💼", "👩🏿‍🔧", "👨🏿‍🔧", "👩🏿‍🔬", "👨🏿‍🔬", "👩🏿‍🎨", "👨🏿‍🎨", "👩🏿‍🚒", "👨🏿‍🚒",
          "👩🏿‍✈️", "👨🏿‍✈️", "👩🏿‍🚀", "👨🏿‍🚀", "👩🏿‍⚖️", "👨🏿‍⚖️", "🤶🏿", "🎅🏿", "👸🏿", "🤴🏿", "👰🏿", "🤵🏿", "👼🏿", "🤰🏿", "🙇🏿‍♀️", "🙇🏿",
          "💁🏿", "💁🏿‍♂️", "🙅🏿", "🙅🏿‍♂️", "🙆🏿", "🙆🏿‍♂️", "🙋🏿", "🙋🏿‍♂️", "🤦🏿‍♀️", "🤦🏿‍♂️", "🤷🏿‍♀️", "🤷🏿‍♂️", "🙎🏿", "🙎🏿‍♂️",
          "🙍🏿", "🙍🏿‍♂️", "💇🏿", "💇🏿‍♂️", "💆🏿", "💆🏿‍♂️", "🕴🏿", "💃🏿", "🕺🏿", "🚶🏿‍♀️", "🚶🏿", "🏃🏿‍♀️", "🏃🏿", "🤲🏿", "👐🏿",
          "🙌🏿", "👏🏿", "🙏🏿", "👍🏿", "👎🏿", "👊🏿", "✊🏿", "🤛🏿", "🤜🏿", "🤞🏿", "✌🏿", "🤟🏿", "🤘🏿", "👌🏿", "👈🏿", "👉🏿", "👆🏿", "👇🏿", "☝🏿", "✋🏿", "🤚🏿",
          "🖐🏿", "🖖🏿", "👋🏿", "🤙🏿", "💪🏿", "🖕🏿", "✍🏿", "🤳🏿", "💅🏿", "👂🏿", "👃🏿"
        ]
      },
      animalsAndNature: {
        title: 'Animals & Nature',
        datas: [
          "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦝", "🐻", "🐼", "🦘", "🦡", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸",
          "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦢", "🦅", "🦉", "🦚", "🦜", "🦇", "🐺", "🐗", "🐴",
          "🦄", "🐝", "🐛", "🦋", "🐌", "🐚", "🐞", "🐜", "🦗", "🕷", "🕸", "🦂", "🦟", "🦠", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑",
          "🦐", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🐘", "🦏", "🦛", "🐪", "🐫", "🦙", "🦒",
          "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🐐", "🦌", "🐕", "🐩", "🐈", "🐓", "🦃", "🕊", "🐇", "🐁", "🐀", "🐿", "🦔", "🐾", "🐉",
          "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘️", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🍄", "🌾", "💐", "🌷", "🌹", "🥀",
          "🌺", "🌸", "🌼", "🌻", "🌞", "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌙", "🌎", "🌍", "🌏",
          "💫", "⭐️", "🌟", "✨", "⚡️", "☄️", "💥", "🔥", "🌪", "🌈", "☀️", "🌤", "⛅️", "🌥", "☁️", "🌦", "🌧", "⛈",
          "🌩", "🌨", "❄️", "☃️", "⛄️", "🌬", "💨", "💧", "💦", "☔️", "☂️", "🌊", "🌫"
        ]
      },
      foodAndDrink: {
        title: 'Food & Drink',
        datas: [
          "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥", "🥝", "🍅", "🍆", "🥑",
          "🥦", "🥒", "🥬", "🌶", "🌽", "🥕", "🥔", "🍠", "🥐", "🍞", "🥖", "🥨", "🥯", "🧀", "🥚", "🍳", "🥞", "🥓", "🥩", "🍗", "🍖",
          "🌭", "🍔", "🍟", "🍕", "🥪", "🥙", "🌮", "🌯", "🥗", "🥘", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🍤", "🍙", "🍚",
          "🍘", "🍥", "🥮", "🥠", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🧂", "🍩", "🍪", "🌰",
          "🥜", "🍯", "🥛", "🍼", "☕️", "🍵", "🥤", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🍾", "🥄", "🍴", "🍽", "🥣",
          "🥡", "🥢"
        ]
      },
      activityAndSports: {
        title: 'Activity and Sports',
        datas: ["⚽️", "🏀", "🏈", "⚾️", "🥎", "🏐", "🏉", "🎾", "🥏", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🥍", "🏏",
          "⛳️", "🏹", "🎣", "🥊", "🥋", "🎽", "⛸", "🥌", "🛷", "🛹", "🎿", "⛷", "🏂", "🏋️‍♀️", "🏋🏻‍♀️", "🏋🏼‍♀️", "🏋🏽‍♀️",
          "🏋🏾‍♀️", "🏋🏿‍♀️", "🏋️‍♂️", "🏋🏻‍♂️", "🏋🏼‍♂️", "🏋🏽‍♂️", "🏋🏾‍♂️", "🏋🏿‍♂️", "🤼‍♀️", "🤼‍♂️", "🤸‍♀️",
          "🤸🏻‍♀️", "🤸🏼‍♀️", "🤸🏽‍♀️", "🤸🏾‍♀️", "🤸🏿‍♀️", "🤸‍♂️", "🤸🏻‍♂️", "🤸🏼‍♂️", "🤸🏽‍♂️", "🤸🏾‍♂️",
          "🤸🏿‍♂️", "⛹️‍♀️", "⛹🏻‍♀️", "⛹🏼‍♀️", "⛹🏽‍♀️", "⛹🏾‍♀️", "⛹🏿‍♀️", "⛹️‍♂️", "⛹🏻‍♂️", "⛹🏼‍♂️",
          "⛹🏽‍♂️", "⛹🏾‍♂️", "⛹🏿‍♂️", "🤺", "🤾‍♀️", "🤾🏻‍♀️", "🤾🏼‍♀️", "🤾🏾‍♀️", "🤾🏾‍♀️", "🤾🏿‍♀️", "🤾‍♂️",
          "🤾🏻‍♂️", "🤾🏼‍♂️", "🤾🏽‍♂️", "🤾🏾‍♂️", "🤾🏿‍♂️", "🏌️‍♀️", "🏌🏻‍♀️", "🏌🏼‍♀️", "🏌🏽‍♀️", "🏌🏾‍♀️", "🏌🏿‍♀️",
          "🏌️‍♂️", "🏌🏻‍♂️", "🏌🏼‍♂️", "🏌🏽‍♂️", "🏌🏾‍♂️", "🏌🏿‍♂️", "🏇", "🏇🏻", "🏇🏼", "🏇🏽", "🏇🏾", "🏇🏿", "🧘‍♀️",
          "🧘🏻‍♀️", "🧘🏼‍♀️", "🧘🏽‍♀️", "🧘🏾‍♀️", "🧘🏿‍♀️", "🧘‍♂️", "🧘🏻‍♂️", "🧘🏼‍♂️", "🧘🏽‍♂️", "🧘🏾‍♂️",
          "🧘🏿‍♂️", "🏄‍♀️", "🏄🏻‍♀️", "🏄🏼‍♀️", "🏄🏽‍♀️", "🏄🏾‍♀️", "🏄🏿‍♀️", "🏄‍♂️", "🏄🏻‍♂️", "🏄🏼‍♂️", "🏄🏽‍♂️",
          "🏄🏾‍♂️", "🏄🏿‍♂️", "🏊‍♀️", "🏊🏻‍♀️", "🏊🏼‍♀️", "🏊🏽‍♀️", "🏊🏾‍♀️", "🏊🏿‍♀️", "🏊‍♂️", "🏊🏻‍♂️", "🏊🏼‍♂️",
          "🏊🏽‍♂️", "🏊🏾‍♂️", "🏊🏿‍♂️", "🤽‍♀️", "🤽🏻‍♀️", "🤽🏼‍♀️", "🤽🏽‍♀️", "🤽🏾‍♀️", "🤽🏿‍♀️", "🤽‍♂️", "🤽🏻‍♂️",
          "🤽🏼‍♂️", "🤽🏽‍♂️", "🤽🏾‍♂️", "🤽🏿‍♂️", "🚣‍♀️", "🚣🏻‍♀️", "🚣🏼‍♀️", "🚣🏽‍♀️", "🚣🏾‍♀️", "🚣🏿‍♀️", "🚣‍♂️",
          "🚣🏻‍♂️", "🚣🏼‍♂️", "🚣🏽‍♂️", "🚣🏾‍♂️", "🚣🏿‍♂️", "🧗‍♀️", "🧗🏻‍♀️", "🧗🏼‍♀️", "🧗🏽‍♀️", "🧗🏾‍♀️", "🧗🏿‍♀️",
          "🧗‍♂️", "🧗🏻‍♂️", "🧗🏼‍♂️", "🧗🏽‍♂️", "🧗🏾‍♂️", "🧗🏿‍♂️", "🚵‍♀️", "🚵🏻‍♀️", "🚵🏼‍♀️", "🚵🏽‍♀️", "🚵🏾‍♀️",
          "🚵🏿‍♀️", "🚵‍♂️", "🚵🏻‍♂️", "🚵🏼‍♂️", "🚵🏽‍♂️", "🚵🏾‍♂️", "🚵🏿‍♂️", "🚴‍♀️", "🚴🏻‍♀️", "🚴🏼‍♀️", "🚴🏽‍♀️",
          "🚴🏾‍♀️", "🚴🏿‍♀️", "🚴‍♂️", "🚴🏻‍♂️", "🚴🏼‍♂️", "🚴🏽‍♂️", "🚴🏾‍♂️", "🚴🏿‍♂️", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖",
          "🏵", "🎗", "🎫", "🎟", "🎪", "🤹‍♀️", "🤹🏻‍♀️", "🤹🏼‍♀️", "🤹🏽‍♀️", "🤹🏾‍♀️", "🤹🏿‍♀️", "🤹‍♂️", "🤹🏻‍♂️", "🤹🏼‍♂️", "🤹🏽‍♂️",
          "🤹🏾‍♂️", "🤹🏿‍♂️", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🎲", "🧩", "♟", "🎯", "🎳", "🎮", "🎰"
        ]
      },
      travelAndPlaces: {
        title: 'Travel & Places',
        datas: [
          "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍", "🚨", "🚔", "🚍",
          "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈️", "🛫", "🛬", "🛩", "💺",
          "🛰", "🚀", "🛸", "🚁", "🛶", "⛵️", "🚤", "🛥", "🛳", "⛴", "🚢", "⚓️", "⛽️", "🚧", "🚦", "🚥", "🚏", "🗺", "🗿", "🗽", "🗼",
          "🏰", "🏯", "🏟", "🎡", "🎢", "🎠", "⛲️", "⛱", "🏖", "🏝", "🏜", "🌋", "⛰", "🏔", "🗻", "🏕", "⛺️", "🏠", "🏡", "🏘", "🏚",
          "🏗", "🏭", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛", "⛪️", "🕌", "🕍", "🕋", "⛩", "🛤", "🛣", "🗾",
          "🎑", "🏞", "🌅", "🌄", "🌠", "🎇", "🎆", "🌇", "🌆", "🏙", "🌃", "🌌", "🌉", "🌁"
        ]
      },
      objects: {
        title: 'Objects',
        datas: [
          "⌚️", "📱", "📲", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥",
          "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛", "⏱", "⏲", "⏰", "🕰", "⌛️", "⏳", "📡", "🔋", "🔌", "💡", "🔦",
          "🕯", "🗑", "🛢", "💸", "💵", "💴", "💶", "💷", "💰", "💳", "🧾", "💎", "⚖️", "🔧", "🔨", "⚒", "🛠", "⛏", "🔩", "⚙️", "⛓", "🔫",
          "💣", "🔪", "🗡", "⚔️", "🛡", "🚬", "⚰️", "⚱️", "🏺", "🧭", "🧱", "🔮", "🧿", "🧸", "📿", "💈", "⚗️", "🔭", "🧰", "🧲",
          "🧪", "🧫", "🧬", "🧯", "🔬", "🕳", "💊", "💉", "🌡", "🚽", "🚰", "🚿", "🛁", "🛀", "🛀🏻", "🛀🏼", "🛀🏽", "🛀🏾", "🛀🏿", "🧴", "🧵",
          "🧶", "🧷", "🧹", "🧺", "🧻", "🧼", "🧽", "🛎", "🔑", "🗝", "🚪", "🛋", "🛏", "🛌", "🖼", "🛍", "🧳", "🛒", "🎁", "🎈", "🎏", "🎀",
          "🎊", "🎉", "🧨", "🎎", "🏮", "🎐", "🧧", "✉️", "📩", "📨", "📧", "💌", "📥", "📤", "📦", "🏷", "📪", "📫", "📬", "📭", "📮", "📯",
          "📜", "📃", "📄", "📑", "📊", "📈", "📉", "🗒", "🗓", "📆", "📅", "📇", "🗃", "🗳", "🗄", "📋", "📁", "📂", "🗂", "🗞", "📰", "📓", "📔",
          "📒", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🔗", "📎", "🖇", "📐", "📏", "📌", "📍", "✂️", "🖊", "🖋", "✒️", "🖌", "🖍", "📝",
          "✏️", "🔍", "🔎", "🔏", "🔐", "🔒", "🔓"
        ]
      },
      symbols: {
        title: 'Symbols',
        datas: [
          "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️",
          "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️",
          "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚️", "🈸", "🈺",
          "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕️", "🛑",
          "⛔️", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗️", "❕", "❓", "❔", "‼️", "⁉️", "🔅",
          "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯️", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀",
          "💤", "🏧", "🚾", "♿️", "🅿️", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️",
          "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",
          "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️", "⏸", "⏯", "⏹", "⏺", "⏭", "⏮", "⏩", "⏪", "⏫", "⏬", "◀️", "🔼", "🔽", "➡️",
          "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "↪️", "↩️", "⤴️", "⤵️", "🔀", "🔁",
          "🔂", "🔄", "🔃", "🎵", "🎶", "➕", "➖", "➗", "✖️", "♾", "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿", "🔚", "🔙",
          "🔛", "🔝", "🔜", "✔️", "☑️", "🔘", "⚪️", "⚫️", "🔴", "🔵", "🔺", "🔻", "🔸", "🔹", "🔶", "🔷", "🔳", "🔲", "▪️", "▫️",
          "◾️", "◽️", "◼️", "◻️", "⬛️", "⬜️", "🔈", "🔇", "🔉", "🔊", "🔔", "🔕", "📣", "📢", "👁‍🗨", "💬", "💭", "🗯", "♠️",
          "♣️", "♥️", "♦️", "🃏", "🎴", "🀄️", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞",
          "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧"
        ]
      },
      flags: {
        title: 'Flags',
        datas: [
          "🏳️", "🏴", "🏁", "🚩", "🏳️‍🌈", "🏴‍☠️", "🇦🇫", "🇦🇽", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺",
          "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲", "🇧🇹", "🇧🇴", "🇧🇦", "🇧🇼", "🇧🇷", "🇮🇴", "🇻🇬", "🇧🇳", "🇧🇬", "🇧🇫", "🇧🇮", "🇰🇭",
          "🇨🇲", "🇨🇦", "🇮🇨", "🇨🇻", "🇧🇶", "🇰🇾", "🇨🇫", "🇹🇩", "🇨🇱", "🇨🇳", "🇨🇽", "🇨🇨", "🇨🇴", "🇰🇲", "🇨🇬", "🇨🇩", "🇨🇰", "🇨🇷", "🇨🇮", "🇭🇷", "🇨🇺", "🇨🇼", "🇨🇾",
          "🇨🇿", "🇩🇰", "🇩🇯", "🇩🇲", "🇩🇴", "🇪🇨", "🇪🇬", "🇸🇻", "🇬🇶", "🇪🇷", "🇪🇪", "🇪🇹", "🇪🇺", "🇫🇰", "🇫🇴", "🇫🇯", "🇫🇮", "🇫🇷", "🇬🇫", "🇵🇫", "🇹🇫", "🇬🇦", "🇬🇲",
          "🇬🇪", "🇩🇪", "🇬🇭", "🇬🇮", "🇬🇷", "🇬🇱", "🇬🇩", "🇬🇵", "🇬🇺", "🇬🇹", "🇬🇬", "🇬🇳", "🇬🇼", "🇬🇾", "🇭🇹", "🇭🇳", "🇭🇰", "🇭🇺", "🇮🇸", "🇮🇳", "🇮🇩", "🇮🇷", "🇮🇶",
          "🇮🇪", "🇮🇲", "🇮🇱", "🇮🇹", "🇯🇲", "🇯🇵", "🎌", "🇯🇪", "🇯🇴", "🇰🇿", "🇰🇪", "🇰🇮", "🇽🇰", "🇰🇼", "🇰🇬", "🇱🇦", "🇱🇻", "🇱🇧", "🇱🇸", "🇱🇷", "🇱🇾", "🇱🇮", "🇱🇹", "🇱🇺",
          "🇲🇴", "🇲🇰", "🇲🇬", "🇲🇼", "🇲🇾", "🇲🇻", "🇲🇱", "🇲🇹", "🇲🇭", "🇲🇶", "🇲🇷", "🇲🇺", "🇾🇹", "🇲🇽", "🇫🇲", "🇲🇩", "🇲🇨", "🇲🇳", "🇲🇪", "🇲🇸", "🇲🇦",
          "🇲🇿", "🇲🇲", "🇳🇦", "🇳🇷", "🇳🇵", "🇳🇱", "🇳🇨", "🇳🇿", "🇳🇮", "🇳🇪", "🇳🇬", "🇳🇺", "🇳🇫", "🇰🇵", "🇲🇵", "🇳🇴", "🇴🇲", "🇵🇰", "🇵🇼", "🇵🇸", "🇵🇦", "🇵🇬",
          "🇵🇾", "🇵🇪", "🇵🇭", "🇵🇳", "🇵🇱", "🇵🇹", "🇵🇷", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇺", "🇷🇼", "🇼🇸", "🇸🇲", "🇸🇦", "🇸🇳", "🇷🇸", "🇸🇨", "🇸🇱", "🇸🇬", "🇸🇽", "🇸🇰", "🇸🇮",
          "🇬🇸", "🇸🇧", "🇸🇴", "🇿🇦", "🇰🇷", "🇸🇸", "🇪🇸", "🇱🇰", "🇧🇱", "🇸🇭", "🇰🇳", "🇱🇨", "🇵🇲", "🇻🇨", "🇸🇩", "🇸🇷", "🇸🇿", "🇸🇪", "🇨🇭", "🇸🇾", "🇹🇼", "🇹🇯", "🇹🇿",
          "🇹🇭", "🇹🇱", "🇹🇬", "🇹🇰", "🇹🇴", "🇹🇹", "🇹🇳", "🇹🇷", "🇹🇲", "🇹🇨", "🇹🇻", "🇻🇮", "🇺🇬", "🇺🇦", "🇦🇪", "🇬🇧", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "🏴󠁧󠁢󠁷󠁬󠁳󠁿", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿",
          "🇻🇺", "🇻🇦", "🇻🇪", "🇻🇳", "🇼🇫", "🇪🇭", "🇾🇪", "🇿🇲", "🇿🇼"
        ]
      },
      newEmojis: {
        title: 'New Emojis',
        datas: [
          "🥱", "🤏", "🦾", "🦿", "🦻", "🧏", "🧏‍♂️", "🧏‍♀️", "🧍", "🧍‍♂️", "🧍‍♀️", "🧎", "🧎‍♂️", "🧎‍♀️", "👨‍🦯",
          "👩‍🦯", "👨‍🦼", "👩‍🦼", "👨‍🦽", "👩‍🦽", "🦧", "🦮", "🐕‍🦺", "🦥", "🦦", "🦨", "🦩", "🧄", "🧅", "🧇", "🧆", "🧈", "🦪", "🧃",
          "🧉", "🧊", "🛕", "🦽", "🦼", "🛺", "🪂", "🪐", "🤿", "🪀", "🪁", "🦺", "🥻", "🩱", "🩲", "🩳", "🩰", "🪕", "🪔", "🪓", "🦯",
          "🩸", "🩹", "🩺", "🪑", "🪒", "🤎", "🤍", "🟠", "🟡", "🟢", "🟣", "🟤", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫"
        ]
      }
    };
  }


  render() {
    const {emojiList} = this;
    return (
      <div className="emojiList">
        {
          Object.keys(this.emojiList).map((key, ki) => (
            <div key={ki}>
              <div className="emojiTitle">{this.emojiList[key].title}</div>
              {
                this.emojiList[key].datas.map((v, i) => (
                  <div key={i} data-num={i} data-title={this.emojiList[key].title} className="emoji"
                                                      onClick={this.props.addEmoji}>{v}</div>
                ))
              }
            </div>
          ))
        }

        {/*<div className="emojiTitle">Smileys</div>*/}
        {/*{*/}
        {/*  emojiList.smileys.map((v, i) => (<div key={i} data-num={i} data-title="Smileys" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">People and Fantasy</div>*/}
        {/*{*/}
        {/*  emojiList.peopleAndFantasy.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="People and Fantasy" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Clothing and Accessories</div>*/}
        {/*{*/}
        {/*  emojiList.clothingAndAccessories.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Clothing and Accessories" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Pale Emojis</div>*/}
        {/*{*/}
        {/*  emojiList.paleEmojis.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Pale Emojis" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Cream White Emojis</div>*/}
        {/*{*/}
        {/*  emojiList.creamWhiteEmojis.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Cream White Emojis" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Moderate Brown Emojis</div>*/}
        {/*{*/}
        {/*  emojiList.moderateBrownEmojis.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Moderate Brown Emojis" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Dark Brown Emojis</div>*/}
        {/*{*/}
        {/*  emojiList.darkBrownEmojis.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Dark Brown Emojis" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Black Emojis</div>*/}
        {/*{*/}
        {/*  emojiList.blackEmojis.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Black Emojis" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Animals & Nature</div>*/}
        {/*{*/}
        {/*  emojiList.animalsAndNature.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Animals & Nature" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Food & Drink</div>*/}
        {/*{*/}
        {/*  emojiList.foodAndDrink.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Food & Drink" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Activity and Sports</div>*/}
        {/*{*/}
        {/*  emojiList.activityAndSports.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Activity and Sports" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Travel & Places</div>*/}
        {/*{*/}
        {/*  emojiList.travelAndPlaces.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="Travel & Places" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Objects</div>*/}
        {/*{*/}
        {/*  emojiList.objects.map((v, i) => (<div key={i} data-num={i} data-title="Objects" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Symbols</div>*/}
        {/*{*/}
        {/*  emojiList.symbols.map((v, i) => (<div key={i} data-num={i} data-title="Symbols" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">Flags</div>*/}
        {/*{*/}
        {/*  emojiList.flags.map((v, i) => (<div key={i} data-num={i} data-title="Flags" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
        {/*<div className="emojiTitle">New Emojis</div>*/}
        {/*{*/}
        {/*  emojiList.newEmojis.map((v, i) => (*/}
        {/*    <div key={i} data-num={i} data-title="New Emojis" className="emoji" onClick={this.props.addEmoji}>{v}</div>))*/}
        {/*}*/}
      </div>
    );
  };
};