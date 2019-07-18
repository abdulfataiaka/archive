export class HeaderPropMock {
  static default() {}
  
  static authLinkView(jestfn) {
    return {
      viewType: 1,
      setView: jestfn()
    }
  }

  static view() {
    return {
      viewType: 1,
      setView: () => {}
    }
  }
}

export class HeaderStateMock {}
