import { useState } from "react";

import {
  ParsedInstagramData,
  InstagramAnalysis
} from "../types/instagram";

import { readInstagramZip } from "../parser/zipParser";
import { analyzeInstagram } from "../utils/analyzer";


export function useInstagramAnalyzer() {

  const [analysis, setAnalysis] =
    useState<InstagramAnalysis | null>(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState<string | null>(null);



  async function uploadZip(
    file: File
  ) {

    try {

      setLoading(true);
      setError(null);


      const data: ParsedInstagramData =
        await readInstagramZip(file);


      const result =
        analyzeInstagram(data);


      setAnalysis(result);


    } catch (err) {

      console.error(err);

      setError(
        "Errore durante l'analisi del file"
      );

    }
    finally {

      setLoading(false);

    }

  }



  return {

    analysis,

    loading,

    error,

    uploadZip

  };

}
