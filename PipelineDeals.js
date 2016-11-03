import Requester from './PipelineDeals/Requester'

import CustomFieldLabelDropdownEntries from './PipelineDeals/CustomFieldLabelDropdownEntries'
import CustomFieldLabels from './PipelineDeals/CustomFieldLabels'
import NoteCategories from './PipelineDeals/NoteCategories'
import Notes from './PipelineDeals/Notes'
import People from './PipelineDeals/People'
import Person from './PipelineDeals/Person'
import Users from './PipelineDeals/Users'

export default class PipelineDeals {
  constructor(auth, apiBase = 'https://api.pipelinedeals.com/api/v3') {
    this.__requester = new Requester(apiBase, auth)
  }

  post(path, data = {}) {
    return this.__requester.post(path, data)
  }

  request(path, query = {}) {
    return this.__requester.request(path, query)
  }

  customFieldLabelDropdownEntries() {
    return new CustomFieldLabelDropdownEntries(this)
  }

  customFieldLabels() {
    return new CustomFieldLabels(this)
  }

  noteCategories() {
    return new NoteCategories(this)
  }

  notes() {
    return new Notes(this)
  }

  people() {
    return new People(this)
  }

  person(attributes) {
    return new Person(this, attributes)
  }

  users() {
    return new Users(this)
  }
}
