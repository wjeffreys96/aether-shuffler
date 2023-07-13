const firebaseMock = jest.createMockFromModule('firebase/compat/app');

firebaseMock.initializeApp = jest.fn();
firebaseMock.getAuth = jest.fn();

export default firebaseMock;
