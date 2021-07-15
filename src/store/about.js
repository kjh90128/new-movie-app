export default {
  namespaced:true,
  state:()=>({//참조형 데이터(객체) 데이터 불변성(고유성)때문(함수로 반환) 
    name: 'test',
    email : 'test@test.com',
    blog: 'https://test.com',
    phone:'+82-10-1234-1234',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSA9_QwbpUvyqWuQ3uoWUSfPc8GUcmCvRwG5mMh8JNhK22RmxPlGQFw744jgn9hMEB3us&usqp=CAU'
  }),
}