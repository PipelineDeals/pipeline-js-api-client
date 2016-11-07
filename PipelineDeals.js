import Requester from './src/Requester'

import CustomFieldLabelDropdownEntries from './src/CustomFieldLabelDropdownEntries'
import CustomFieldLabels from './src/CustomFieldLabels'
import CustomFieldGroups from './src/CustomFieldGroups'
import NoteCategories from './src/NoteCategories'
import Notes from './src/Notes'
import People from './src/People'
import Person from './src/Person'
import Users from './src/Users'

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

  customFieldGroups() {
    return new CustomFieldGroups(this)
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
