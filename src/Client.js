import Requester from './Requester'

import CustomFieldLabelDropdownEntries from './CustomFieldLabelDropdownEntries'
import CustomFieldLabels from './CustomFieldLabels'
import CustomFieldGroups from './CustomFieldGroups'
import NoteCategories from './NoteCategories'
import Notes from './Notes'
import People from './People'
import Person from './Person'
import Users from './Users'

export default class Client {
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