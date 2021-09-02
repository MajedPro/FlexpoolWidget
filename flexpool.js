// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: angle-double-up;

const address = '0x709303b9E7E95C59920BC9C41Be4CD40377801C7'; // Flexpool miner address

const baseFlexpoolUrl = "https://api.flexpool.io/v2";
const balanceURL = `${baseFlexpoolUrl}/miner/balance?coin=ETH&address=${address}`;
const hashURL = `${baseFlexpoolUrl}/miner/stats?coin=ETH&address=${address}`;
const poolHashURl = `${baseFlexpoolUrl}/pool/hashrate?coin=ETH`;
const poolLuckURL = `${baseFlexpoolUrl}/pool/currentLuck?coin=ETH`;
const workerCountUrl =`${baseFlexpoolUrl}/miner/workerCount/?coin=ETH&address=${address}`;
const estimatedURL = `${baseFlexpoolUrl}/pool/dailyRewardPerGigahashSec?coin=eth`;
const roundShareUrl = `${baseFlexpoolUrl}/miner/roundShare?coin=eth&address=${address}`;


const fm = new Request('https://raw.githubusercontent.com/MajedPro/FlexpoolWidget/main/flexpool.png')
const flexIcon = await fm.loadImage()


const poolLuckData = new Request(poolLuckURL);
const poolLuckRes = await poolLuckData.loadJSON();
var poolLuck = poolLuckRes["result"];
poolLuck = poolLuck * 200;
poolLuck = Number(poolLuck).toFixed(2);

const workerCountData = new Request(workerCountUrl);
const workerCountRes = await workerCountData.loadJSON();
var workerCount = workerCountRes["result"]["workersOnline"];
workerCount = workerCount;

const roundShareData = new Request(roundShareUrl);
const roundShareRes = await roundShareData.loadJSON();
var roundShare = roundShareRes["result"];
roundShare = roundShare * 100;
roundShare = Number(roundShare).toPrecision(3);



const poolData = new Request(poolHashURl);
const poolRes = await poolData.loadJSON();
var poolHashrate = poolRes["result"]["total"];
poolHashrate = poolHashrate / 1e12;
poolHashrate = Number(poolHashrate).toPrecision(3);

const hashData = new Request(hashURL);
const hashRes = await hashData.loadJSON();
var hashe = hashRes["result"]["currentEffectiveHashrate"];
var hashr = hashRes["result"]["reportedHashrate"];
var hasha = hashRes["result"]["averageEffectiveHashrate"]
hashe = hashe / 1e9;
hashe = Number(hashe).toPrecision(3);
hashr = hashr / 1e9;
hashr = Number(hashr).toPrecision(3);
hasha = hasha / 1e9;
hasha = Number(hasha).toPrecision(3);

const estimatedData = new Request(estimatedURL);
const estimatedRes = await estimatedData.loadJSON();
var estBalance = estimatedRes["result"];
estBalance = estBalance / 1e18 * hasha;
estBalance = Number(estBalance).toPrecision(3);

const balanceData = new Request(balanceURL);
const balanceRes = await balanceData.loadJSON();
var balance = balanceRes["result"]["balance"];
balance = balance / 1e18;
balance = Number(balance).toPrecision(4);


const widget = new ListWidget();
const stacker = widget.addStack();

widget.backgroundColor = new Color("#161616");

let imageStyle = stacker.addImage(flexIcon);
    imageStyle.imageSize = new Size(25, 25);
stacker.addSpacer(8);
online = stacker.addText("flexpool");
online.textColor = Color.white();
online.font = Font.mediumRoundedSystemFont(17);
stacker.addSpacer(10); 

widget.addSpacer(4);
const poolrateText = widget.addText(String(poolHashrate)+' TH/s');
poolrateText.textColor = Color.green();
poolrateText.font = Font.blackRoundedSystemFont(8);
poolrateText.rightAlignText()
const poolLuckText = widget.addText(String(poolLuck)+' %');
poolLuckText.textColor = Color.green();
poolLuckText.font = Font.mediumRoundedSystemFont(8);
poolLuckText.rightAlignText()




widget.addSpacer(9);

const workerCountText = widget.addText('Workers: ' + String(workerCount));
workerCountText.textColor = Color.yellow()
workerCountText.font = Font.mediumRoundedSystemFont(10);


widget.addSpacer(3);

const roundShareText = widget.addText('Block share | '+String(roundShare)+'%');
roundShareText.textColor = Color.cyan();
roundShareText.font = Font.mediumRoundedSystemFont(8);
roundShareText.leftAlignText()

const estbalanceText = widget.addText('Estimated: ' + String(estBalance)+' ETH');
estbalanceText.textColor = Color.blue()
estbalanceText.font = Font.mediumRoundedSystemFont(10);


const balanceText = widget.addText('Balance: ' + String(balance)+' ETH');
balanceText.textColor = Color.magenta()
balanceText.font = Font.mediumRoundedSystemFont(10);
widget.addSpacer(2);

const hasheText = widget.addText('Current: ' + String(hashe)+' GH/s');
hasheText.textColor = Color.white()
hasheText.font = Font.mediumRoundedSystemFont(9);

const hashrText = widget.addText('Reported: ' + String(hashr)+' GH/s');
hashrText.textColor = Color.white()
hashrText.font = Font.mediumRoundedSystemFont(9);

widget.addSpacer(5);
const date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0' + minutes : minutes;
var currentTime = hours + ':' + minutes + ' ' + ampm;
const lastUpdate = widget.addText(`Last Update: ${currentTime}`);
lastUpdate.textColor = Color.darkGray();
lastUpdate.font = Font.mediumSystemFont(8);


if (config.runsInWidget) {
  Script.setWidget(widget)
} else if (config.runsWithSiri){
  const message = `Current balance is ${balance} ethereum (and current speed is ${hashe} Giga hash per second)`
  Speech.speak(message)
} else {
  widget.presentSmall()
}

Script.complete()
