export const getIconUrl = (name) => {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href
}

export const mapIcon = (forumName) => {
  const forumList = [
    {
      forum_name: 'youtube',
      forum_icon: 'youtube',
    },
    {
      forum_name: 'apple',
      forum_icon: 'apple',
    },
    {
      forum_name: 'netflix',
      forum_icon: 'netflix',
    },
    {
      forum_name: '3C',
      forum_icon: '3c',
    },
    {
      forum_name: '工作',
      forum_icon: 'job',
    },
    {
      forum_name: '美食',
      forum_icon: 'food',
    },
    {
      forum_name: '交友',
      forum_icon: 'friends',
    },
    {
      forum_name: '女孩',
      forum_icon: 'girl',
    },
    {
      forum_name: '感情',
      forum_icon: 'love',
    },
    {
      forum_name: '遊戲',
      forum_icon: 'game',
    },
    {
      forum_name: '閒聊',
      forum_icon: 'chat',
    },
  ]
  const fourm = forumList.find((item) => {
    return item.forum_name === forumName
  })
  return fourm.forum_icon
}
