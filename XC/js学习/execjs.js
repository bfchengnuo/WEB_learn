function checkNamePWD(e,flag) {
  var len = e.value.length
  var dom_msg
  if (flag) {
    dom_msg = document.getElementById("name_msg")
  }else{
    dom_msg = document.getElementById("pwd_msg")
  }
  if (len < 4 || len > 8) {
    if (flag) {
      dom_msg.innerHTML = "<font color='red'>用户名必须 4-8</font>"
      return false
    }
    dom_msg.innerHTML = "<font color='red'>用户密码必须 4-8</font>"
    return false
  }
  dom_msg.innerHTML = "<font color='green'>验证通过</font>"
  return true
}

function checkRePWD(e) {
  var dom_msg = document.getElementById("repwd_msg")
  var dom_pwd = document.getElementsByName("pwd")[0]

  if (e.value == dom_pwd.value) {
    dom_msg.innerHTML = "<font color='green'>验证通过</font>"
    return true
  }
  dom_msg.innerHTML = "<font color='red'>两次输入不匹配</font>"
  return false
}

function checkHobby() {
  var dom_msg = document.getElementById("hobby_msg")
  var dom_hobby = document.getElementsByName("hobby")
  var count = 0
  for (var i = dom_hobby.length - 1; i >= 0; i--) {
    if (dom_hobby[i].checked) {
      count++
    }
  }
  if (count < 3) {
    dom_msg.innerHTML = "<font color='red'>爱好少于三个</font>"
    return false
  }
  dom_msg.innerHTML = "<font color='green'>验证通过</font>"
  return true
}

function check(e) {
  var dom_msg = document.getElementById("w_msg")
  var sum = e.value.length
  if (sum <= 140) {
    dom_msg.innerHTML = "<font color='green'>您还可以输入" + (140 - sum) + "个字</font>"
    return true
  }
  dom_msg.innerHTML = "<font color='red'>您已经超出" + (sum - 140) + "个字</font>"
  return false
}

function checkAll() {
  var dom_inputs = document.getElementsByTagName("input")
  var flag = true
  flag = flag && checkNamePWD(dom_inputs[0],true)
  flag = flag && checkNamePWD(dom_inputs[1],false)
  flag = flag && checkRePWD(dom_inputs[2])
  flag = flag && checkHobby(dom_inputs[3])
  flag = flag && check(dom_inputs[4])

  return flag
}