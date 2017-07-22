import Requester from './Requester'

import Account from './Account'
import Companies from './Companies'
import CustomFieldLabelDropdownEntries from './CustomFieldLabelDropdownEntries'
import CustomFieldLabels from './CustomFieldLabels'
import CustomFieldGroups from './CustomFieldGroups'
import DealLossReasons from './DealLossReasons'
import LeadSources from './LeadSources'
import NoteCategories from './NoteCategories'
import Notes from './Notes'
import People from './People'
import Person from './Person'
import Profile from './Profile'
import Users from './Users'

export default class Client {
  constructor (auth, apiBase = 'https://api.pipelinedeals.com/api/v3') {
    this.__requester = new Requester(apiBase, auth)
  }

  delete (path, query = {}) {
    return this.__requester.delete(path, query)
  }

  post (path, data = {}) {
    return this.__requester.post(path, data)
  }

  put (path, data = {}) {
    return this.__requester.put(path, data)
  }

  request (path, query = {}) {
    return this.__requester.request(path, query)
  }

  account () {
    return new Account(this)
  }

  companies () {
    return new Companies(this)
  }

  customFieldLabelDropdownEntries () {
    return new CustomFieldLabelDropdownEntries(this)
  }

  customFieldLabels () {
    return new CustomFieldLabels(this)
  }

  customFieldGroups () {
    return new CustomFieldGroups(this)
  }

  dealLossReasons () {
    return new DealLossReasons(this)
  }

  leadSources () {
    return new LeadSources(this)
  }

  noteCategories () {
    return new NoteCategories(this)
  }

  notes () {
    return new Notes(this)
  }

  people () {
    return new People(this)
  }

  person (attributes) {
    return new Person(this, attributes)
  }

  profile () {
    return new Profile(this)
  }

  users () {
    return new Users(this)
  }
}
