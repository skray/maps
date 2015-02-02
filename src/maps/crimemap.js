(function(L, MQ) {

    var center = [38.6272, -90.3];
    var initialZoom = 11;
    var map;

    var data = "\
    Complaint,CodedMonth,DateOccur,FlagCrime,FlagUnfounded,FlagAdministrative,Count,FlagCleanup,Crime,District,Description,ILEADSAddress,ILEADSStreet,Neighborhood,LocationName,LocationComment,CADAddress,CADStreet,XCoord,YCoord\n\
    14-053630,2014-11,1/1/2001 14:23,Y, , ,1, ,21000,5,RAPE -- FORCIBLE,5000,ST LOUIS AVE,52, , ,5000,ST LOUIS,0,0\n\
    14-053630,2014-11,1/1/2001 14:23,Y, , ,1, ,21000,5,RAPE -- FORCIBLE,5000,ST LOUIS AVE,52, , ,5000,ST LOUIS,0,0\n\
    14-055458,2014-11,1/1/2014 10:45,Y, , ,1, ,121000,4,EMBEZZLEMENT-VALUE OVER $150,1,N JEFFERSON AVE,37,WELLS FARGO,WELLS FARGO,114,BEAUMONT,901374.6,1019237\n\
    14-054213,2014-11,1/4/2006 9:49,Y, , ,1, ,115400,1,STLG BY DECEIT/IDENTITY THEFT REPORT,7824,IVORY AVE,2, , ,7824,IVORY,887633.4,988542.3\n\
    14-052660,2014-11,1/31/2014 12:00,Y, , ,1, ,115200,0,FRAUD-STEALING BY DECEIT/UNDER $150,9999,UNKNOWN,0, , ,3660,BATES,0,0\n\
    14-056059,2014-11,2/17/2014 11:00,Y, , ,1, ,65701,3,LARCENY-MTR VEH PARTS UNDER $500,3457,MINNESOTA AVE,19, , ,3457,MINNESOTA,895876.5,1004801\n\
    14-052946,2014-11,2/28/2014 16:00,Y, , ,1, ,69702,4,LARCENY-ALL OTHER UNDER $500,4116,PECK ST,67, , ,4116,PECK,902281.2,1031012\n\
    14-052509,2014-11,3/14/2014 22:38,Y, , ,1, ,266999,5,PUBLIC ORDER-OTHR UNSPC PBLC ORDER VIOLATION,5431,CABANNE AVE,49, , ,5431,CABANNE,884052.6,1028622\n\
    14-021095,2014-11,3/30/2014 12:00,Y, , ,1, ,103000,2,FORGERY-ISSUING FALSE INSTRUMENT OR CERTIFICAT,6024,MAGNOLIA,11, , ,6024,MAGNOLIA,0,0\n\
    14-053745,2014-11,4/1/2014 8:00,Y, , ,1, ,51312,6,BURGLARY-RESDNCE/UNK TIM/FORC ENT/UNOCCUPIED,4851,GREER AVE,55, ,TWO FAMILY FLAT,4851,GREER,891364.5,1033406\n\
    14-056110,2014-11,4/3/2012 10:00,Y, , ,1, ,65701,5,LARCENY-MTR VEH PARTS UNDER $500,1711,N TAYLOR AVE,56, , ,1711,TAYLOR,892283.4,1028937\n\
    14-052703,2014-11,4/23/2014 8:00,Y, , ,1, ,67701,2,LARCENY-FROM BUILDING UNDER $500,4223,CONNECTICUT ST,15, , ,4223,CONNECTICUT,889028.1,1008012\n\
    14-051002,2014-11,5/1/2014 12:00,Y, , ,1, ,51322,3,BURGLARY-RESDNCE/UNK TIM/UNLW EN/UNOCCUPIED,3448,KEOKUK ST,16, , ,3448,KEOKUK,893724,1002322\n\
    14-054607,2014-11,5/1/2014 12:28,Y, , ,1, ,111110,3,FRAUD-BAD CHECK/INSUF FUNDS/OVER $150,3803,S BROADWAY,16, ,@REGIONS BANK,3803,BROADWAY,898121,1002262\n\
    13-022684,2014-11,5/9/2013 13:00, , , ,-1, ,72113,1,AUTO THEFT-TRUCK/PERM RETNT/UNRECOV OVER 48HR,5411,S COMPTON AVE,1, , ,5411,COMPTON,893051.3,994865\n\
    14-051696,2014-11,5/14/2014 10:13,Y, , ,1, ,266999,5,PUBLIC ORDER-OTHR UNSPC PBLC ORDER VIOLATION,3936,COOK AVE,58, , ,3936,COOK,895577.4,1024907\n\
    14-053742,2014-11,5/16/2014 16:00,Y, , ,1, ,71013,5,AUTO THEFT-PERM RETNT/UNRECOV OVER 48HR,0,DR MARTIN LUTHER KING DR / N N,54, , ,5225,PAGE,892819,1028097\n\
    14-051303,2014-11,5/22/2014 8:00,Y, , ,1, ,115400,1,STLG BY DECEIT/IDENTITY THEFT REPORT,5020,BANCROFT AVE,7, , ,5020,BANCROFT,883498.9,1003619\n\
    14-053547,2014-11,5/22/2014 18:26,Y, , ,1, ,266999,6,PUBLIC ORDER-OTHR UNSPC PBLC ORDER VIOLATION,4544,N KINGSHIGHWAY BLVD,71, ,NUISANCE ABATEMENT PROPERTY,4544,KINGSHIGHWAY,893139.7,1038926\n\
    14-053953,2014-11,5/23/2014 16:19,Y, , ,1, ,67601,5,\"LARCENY-FROM BUILDING $500 - $24,999\",6157,WATERMAN BLVD,46, , ,6157,WATERMAN,877648.1,1025963\
    14-053548,2014-11,5/24/2014 21:12,Y, , ,1, ,266999,6,PUBLIC ORDER-OTHR UNSPC PBLC ORDER VIOLATION,4544,N KINGSHIGHWAY BLVD,71, ,NUISANCE ABATEMENT PROPERTY,4544,KINGSHIGHWAY,893139.7,1038926\n\
    14-053549,2014-11,5/24/2014 22:28,Y, , ,1, ,266999,6,PUBLIC ORDER-OTHR UNSPC PBLC ORDER VIOLATION,4544,N KINGSHIGHWAY BLVD,71, ,NUISANCE ABATEMENT PROPERTY,4544,KINGSHIGHWAY,893139.7,1038926\n\
    14-054429,2014-11,6/1/2014 0:00,Y, , ,1, ,65701,6,LARCENY-MTR VEH PARTS UNDER $500,4646,BIRCHER BLVD,69, , ,4646,BIRCHER,895354.9,1037222\
    ";

    init();

    function init() {
        buildMap('mapquest');

        Papa.parse(data,{
            header: true,
            complete: function gotEm(rows) {
                console.log(rows);
                rows.data.forEach(function(row) {
                    map.addLayer(new L.marker([row.XCoord, row.YCoord])
                    console.log(row);
                });
            },
            error: function errored(err, file) {
                console.log(err);
            }
        })     
    }

    function buildMap(type) {
        switch(type) {
            case 'mapquest':
                map = L.map('map', {
                    layers: MQ.mapLayer(),
                    center: center,
                    zoom: initialZoom
                });
                break;
            default:
                map = L.map('map').setView(center, initialZoom);

                L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18
                }).addTo(map);
        }
    }

}(L, MQ));