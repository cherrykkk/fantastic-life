import { Area } from '../Area'
import { Character } from '../Character'

export class Artifact {
    /* 外部属性 */
    owner?: Character
    area?: Area
    warehouse = []
    使用权 = []
    
}