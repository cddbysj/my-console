import { useState, useEffect } from "react";
import firebase from "../api/firebase";

export default function useCertificates(filter) {
  const [certificates, setCertificates] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.certificates(filter).onSnapshot(snapshot => {
      const certificates = [];
      snapshot.forEach(doc => {
        // 转化成想要的结构，用于展示
        const {
          orderId,
          arrivalAt,
          products,
          preparePrintAt,
          printDone
        } = doc.data();
        Object.keys(products).forEach(name =>
          certificates.push({
            ...products[name],
            name,
            orderId,
            arrivalAt,
            preparePrintAt,
            printDone
          })
        );
      });

      setCertificates(certificates);
    });
    return unsubscribe;
  }, [filter]);

  return certificates;
}
