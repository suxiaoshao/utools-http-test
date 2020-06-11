import {AllHistory, HistoryItem} from "@/util/interface";

export default class WebHistory implements AllHistory {
    public historyList: HistoryItem[]
    public head: number;

    constructor() {
        this.head = -1
        this.historyList = []
    }
}
