package common;

import org.apache.pdfbox.cos.COSDocument;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

public class BomExtraction {
	public File file;
	private PDFParser parser;
	private COSDocument cosDoc;
	private PDDocument pdDoc;
	private PDFTextStripper pdfStripper;
	
	public BomExtraction(String fName){
		this.file = new File(fName);
//		this.file = new File("C:/covid/DE PBV_CPM SKID.pdf");
	}
	
	//test 용도 - main method
//	public static void main(String[] arg){
//		BomExtraction be = new BomExtraction("C:/covid/DE PBV_CPM SKID.pdf");
//		try {
//			be.pdfParser();
//			be.textExtraction();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
	
	/* 수정사항 발생 시 Revision 194 참고 */
	public void pdfParser() throws IOException{
		parser = new PDFParser(new FileInputStream(file));
		parser.parse();
		cosDoc = parser.getDocument();
		pdDoc = new PDDocument(cosDoc);
		
		pdfStripper = new PDFTextStripper("UTF-8");
		pdfStripper.setForceParsing(false);
		pdfStripper.setSortByPosition(true);
		pdfStripper.setShouldSeparateByBeads(true);
		pdfStripper.setStartPage(1);
		pdfStripper.setEndPage(pdfStripper.getEndPage());
		pdfStripper.setLineSeparator("\n");
		pdfStripper.inspectFontEncoding(pdDoc.toString());
		pdfStripper.setWordSeparator("@");
	}
	
	public List<String> textExtraction(){
		List<String> partsList = new ArrayList<String>();
		
		try {			
			String parsedText = pdfStripper.getText(pdDoc);
			String[] arrTxt = parsedText.split("\n");
			String[] allocArrTxt;

			//Text extraction start
			int arrSize = arrTxt.length;
			for (int i=3; i<arrSize; i++) {
				//System.out.println(arrTxt[i]);
				if (arrTxt[i].length() > 5) {	
					if(!arrTxt[i].contains("#")) {
						continue;
					}else{
						arrTxt[i] = arrTxt[i].replace("  ", "@@");
						
						//csv형태로 치환(공백 → ,^) : split 대비
						arrTxt[i] = arrTxt[i].replace(" ", ",^");
						int arrTxtSize = arrTxt[i].length();
						//System.out.println(arrTxt[i]);

						// '#' check
						//System.out.println(arrTxt[i]);
						int idx = arrTxt[i].indexOf("#");
						if(idx > 0){
							arrTxt[i] = arrTxt[i].substring(idx, arrTxtSize);
							arrTxtSize = arrTxt[i].length();
						}
						//(210714 - start)
//						String[] arrTmp = arrTxt[i].split("#");
//						int arrTmpSize = arrTmp.length;		
						// 특수기호로 인해, 한 LINE에 #이 다수 읽히게 될 경우 - 동적으로 array 추가 생성
//						allocArrTxt = new String[arrSize + (arrTmpSize - (arrTmpSize-1))];						
						//System.out.println(arrTmp.length + "\n");
//						if(arrTmpSize > 2){
//							arrTxt[i] = "#" + arrTmp[1];
//							arrTxt[arrSize++] = arrTmp[2];
//						}
						//System.out.println("idx=" + idx + ", arrTxtSize=" + arrTxtSize +"\n");
						//(210714 - end)
								
						// last char check				
						if(regexEngCheck(arrTxt[i].substring(arrTxtSize-1))){
							arrTxt[i] = arrTxt[i].substring(0, arrTxtSize-2);
							arrTxtSize = arrTxt[i].length();
						}
						
						String[] arrChar = arrTxt[i].split(",", -1);
						int arrCharSize = arrChar.length;			
						
						// char unit check
						final List<String> list = new ArrayList<String>();
						for(int j=0; j<arrCharSize; j++){
							//parts name index check
							if(regexEngCheck(arrChar[j])){		
								if(j > 1){
									arrTxt[i] = "";
									Collections.addAll(list, arrChar);
									
									//parts name index의 품번 앞까지 제거
									for(int z=0; z<j-1; z++){
										list.remove(0);
									}
									
									//쉼표 붙히기(굳이 필요는 없는 과정, 단계 나눠봄, 코드 최적화 시 판단해볼 것)
									int lSize=list.size(), lIdx=0;
									for(String m : list){
										if(lIdx > 0 && lIdx < lSize){
											arrTxt[i] += "," + m;
										}else{
											arrTxt[i] = m;
										}
										lIdx++;
									}
								}
								break;
							}
						}
						
						//space merge
						arrChar = arrTxt[i].split("@", -1);
						arrCharSize = arrChar.length;	
						for(int j=1; j<arrCharSize; j++){
							if(arrChar[j].contains(",^") /*&& arrChar[j].charAt(0) != ','*/){
								arrChar[j] = arrChar[j].replace(",^", " ");
								
								list.clear();
								Collections.addAll(list, arrChar);
								
								int lSize=list.size(), lIdx=0;
								for(String m : list){
									if(lIdx > 0 && lIdx < lSize){
										arrTxt[i] += "," + m.trim();
									}else{
										arrTxt[i] = m.trim();
									}
									lIdx++;
								}
								//break;
							}
						}
						
						//last character convert(space -> ,)
						arrChar = arrTxt[i].split(",", -1);
						//210715 주석 처리함(166~172) - 사유 : 144line chatAt(0) 주석
//						arrCharSize = arrChar.length;		
//						
//						for(int j=1; j<arrCharSize; j++){
//							if(arrChar[j].contains("^")){
//								arrChar[j] = arrChar[j].replace("^", " ");
//							}
//						}
						
						list.clear();
						Collections.addAll(list, arrChar);
						
						int lSize = list.size(), lIdx = 0;
						for(String m : list){
							if(lIdx > 0 && lIdx < lSize){
								arrTxt[i] += "," + m.trim();
							}else{
								arrTxt[i] = m.trim();
							}
							lIdx++;
						}
						arrTxt[i] += ",";
						
						//row size check
//						if(arrCharSize < 6){
//							if(!arrChar[arrCharSize-1].contains("^ ^")){
//								arrChar[arrCharSize-1] = arrChar[arrCharSize-1].replace("^", "^ ^");
//							}
//						}
						
//						if(arrChar[arrCharSize-1].contains("^ ^")){
//							arrChar[arrCharSize-1] = arrChar[arrCharSize-1].replace("^ ^", ",");
//							list.clear();
//							Collections.addAll(list, arrChar);
//							
//							int lSize = list.size(), lIdx = 0;
//							for(String m : list){
//								if(lIdx > 0 && lIdx < lSize){
//									arrTxt[i] += "," + m.trim();
//								}else{
//									arrTxt[i] = m.trim();
//								}
//								lIdx++;
//							}
//						}
						
						//final clean
						//arrTxt[i] = arrTxt[i].replace("^", "").replace("#", "");
						arrTxt[i] = (arrTxt[i].contains("@")) ? arrTxt[i].replace("@", ",") : arrTxt[i].replace("^", "");
						
						//duplicate remove
						//한 라인에 여러개의 #가 읽혔을 경우 분할 작업(210714)					
						if(!partsList.contains(arrTxt[i])){
							String[] arrTmp = arrTxt[i].split("#");
							int arrTmpSize = arrTmp.length;		
							if(arrTmpSize > 2){
								for(int j=1; j<arrTmpSize; j++){
									partsList.add(arrTmp[j]);
								}
							}else{
								partsList.add(arrTxt[i].replace("#", ""));
							}
						}
					}
				} else {
					continue;
				}
			}
			
//			for(String s : partsList){
//				System.out.println("row=>" + s);
//			}
			
			pdDoc.close();
			cosDoc.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return partsList;
	}
	
	//num 정규식
	private static boolean regexNumCheck(String s) {
		String pattern = "^[0-9#]*$";
		boolean regex = Pattern.matches(pattern, s);
		return regex;
	}
	
	//eng 정규식
	private static boolean regexEngCheck(String s) {
		String pattern = ".*[a-zA-Z].*";
		boolean regex = Pattern.matches(pattern, s);
		return regex;
	}
	
	// 인코딩 확인
	public void checkEncoding(String str){
		String [] types = {"UTF-8","EUC-KR","ISO-8859-1","MS949","KSC5601","X-WINDOWS-949"};
		for(int i=0; i<types.length; i++){
			for(int j=0; j<types.length; j++){
				try {
					System.out.println("["+types[i]+", "+types[j]+"] = " + new String(str.getBytes(types[i]), types[j]));
				} catch (Exception e) {
					e.printStackTrace();
				}					
			}
		}
	}	
}