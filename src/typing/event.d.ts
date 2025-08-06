interface EventList {
    id: 1
    unionid: 'qweasd'
    title: '项目启动会'
    notes: '与团队成员讨论项目计划'
    createdAt: '2025-08-06T15:54:36.000Z'
    eventTags: EventTags[]
}

interface EventTags {
    eventId: 1
    tagId: 1
    tag: {
        id: 1
        name: '工作'
    }
}
