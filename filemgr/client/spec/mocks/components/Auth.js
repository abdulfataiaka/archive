export class AuthPropMock {
  static default() {}

  static index() {
    return {
      viewType: 1,
      error: null
    }
  }

  static view() {
    return {
      view: '',
      error: null,
      email: '',
      password: '',
      loading: false,
      onChange: () => {},
      onSubmit: () => {}
    };
  }
}

export class AuthStateMock {}
