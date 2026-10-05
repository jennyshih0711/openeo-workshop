export function registrationRows(people, roster, teams) {
 const assignments = new Map(roster.map(person => [person.id, person.groupId]));
 const numbers = new Map(teams.map((team, index) => [team.id, index + 1]));
 const time = person => person.createdAt?.toMillis?.() ?? ((person.createdAt?.seconds || 0) * 1000);
 const formatter = new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
 return [...people].sort((a,b) => time(a)-time(b) || a.id.localeCompare(b.id)).map((person,index) => {
  const group = numbers.get(assignments.get(person.id));
  return [index+1,person.name || '',person.email || '',String(person.phone || ''),person.dept || '',person.meal || '',group ? '第 '+group+' 組' : '尚未分組',person.createdAt ? formatter.format(new Date(time(person))) : '',person.id];
 });
}
export function buildRegistrationWorkbook(people, roster, teams, Excel = globalThis.ExcelJS) {
 if (!Excel) throw Error('Excel 匯出元件未載入，請重新整理後重試。');
 const workbook = new Excel.Workbook();
 workbook.creator = '國土治理工作坊';
 const sheet = workbook.addWorksheet('報名名單', {views:[{state:'frozen',ySplit:1}]});
 sheet.columns = [
  {header:'序號',width:8},{header:'姓名',width:18},{header:'電子郵件',width:34},
  {header:'聯絡電話',width:20},{header:'系所',width:48},{header:'餐飲需求',width:14},
  {header:'組別',width:16},{header:'報名時間（台灣時間）',width:27},{header:'報名紀錄 ID',width:34}
 ];
 sheet.addRows(registrationRows(people,roster,teams));
 sheet.autoFilter = {from:'A1',to:'I'+Math.max(1,sheet.rowCount)};
 sheet.eachRow((row,index) => {
  row.height = index===1 ? 30 : 26;
  row.eachCell({includeEmpty:true},cell => {
   cell.font = {name:'Microsoft JhengHei',size:11,color:{argb:index===1?'FFFFFFFF':'FF183247'},bold:index===1};
   cell.alignment = {vertical:'middle',wrapText:true};
   cell.fill = {type:'pattern',pattern:'solid',fgColor:{argb:index===1?'FF0F3557':index%2===0?'FFEAF3F8':'FFFFFFFF'}};
   if(index>1 && cell.col>1) cell.numFmt = '@';
  });
 });
 sheet.pageSetup = {orientation:'landscape',paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:0,printTitlesRow:'1:1'};
 return workbook;
}
